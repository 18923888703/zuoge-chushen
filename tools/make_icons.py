#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成「做个厨神」App 图标（无第三方依赖：手写光栅化 + PNG 编码）。
设计：做旧纸底 + 黄铜双线框 + 鼠尾草绿碗 + 墨色蒸汽三缕。
渲染在 4 倍画布上再做盒式降采样，天然抗锯齿。
"""
import os, zlib, struct, math

SS = 4  # 超采样倍数

PAPER = (246, 243, 234)
BRASS = (149, 118, 58)
SAGE = (92, 115, 100)
INK = (42, 36, 30)
SEAL = (138, 58, 44)


class Canvas:
    def __init__(self, w, h, bg=PAPER):
        self.w, self.h = w, h
        self.buf = [float(bg[0]), float(bg[1]), float(bg[2])] * (w * h)

    def blend(self, i, col, cov):
        if cov <= 0:
            return
        if cov > 1:
            cov = 1.0
        b = self.buf
        j = i * 3
        b[j] += (col[0] - b[j]) * cov
        b[j + 1] += (col[1] - b[j + 1]) * cov
        b[j + 2] += (col[2] - b[j + 2]) * cov

    # 圆角矩形（实心）
    def roundrect(self, x0, y0, x1, y1, r, col, a=1.0, cov_of=None):
        cx, cy = (x0 + x1) / 2.0, (y0 + y1) / 2.0
        hw, hh = (x1 - x0) / 2.0 - r, (y1 - y0) / 2.0 - r
        for py in range(int(max(0, y0 - 2)), int(min(self.h, y1 + 2))):
            for px in range(int(max(0, x0 - 2)), int(min(self.w, x1 + 2))):
                dx = abs(px + 0.5 - cx) - hw
                dy = abs(py + 0.5 - cy) - hh
                d = math.hypot(max(dx, 0.0), max(dy, 0.0)) + min(max(dx, dy), 0.0) - r
                cov = max(0.0, min(1.0, 0.5 - d)) * a
                if cov > 0:
                    self.blend(py * self.w + px, col, cov)

    def roundrect_ring(self, x0, y0, x1, y1, r, t, col, a=1.0):
        """外框减内框：先画外，再挖内（纸色回填，底是纯纸色所以成立）"""
        self.roundrect(x0, y0, x1, y1, r, col, a)
        self.roundrect(x0 + t, y0 + t, x1 - t, y1 - t, max(0.0, r - t), PAPER, 1.0)

    def disc(self, cx, cy, r, col, a=1.0, half=None):
        """half='bottom' 只画下半（碗体）"""
        for py in range(int(max(0, cy - r - 2)), int(min(self.h, cy + r + 2))):
            if half == 'bottom' and py + 0.5 < cy - 0.5:
                continue
            for px in range(int(max(0, cx - r - 2)), int(min(self.w, cx + r + 2))):
                d = math.hypot(px + 0.5 - cx, py + 0.5 - cy)
                cov = max(0.0, min(1.0, r + 0.5 - d)) * a
                if cov > 0:
                    self.blend(py * self.w + px, col, cov)

    def dot(self, cx, cy, r, col, a=1.0):
        self.disc(cx, cy, r, col, a)

    def stroke(self, pts, w, col, a=1.0):
        r = w / 2.0
        step = max(0.6, r * 0.5)
        for i in range(len(pts) - 1):
            (x0, y0), (x1, y1) = pts[i], pts[i + 1]
            seg = math.hypot(x1 - x0, y1 - y0)
            n = max(2, int(seg / step) + 1)
            for k in range(n + 1):
                t = k / n
                self.dot(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, r, col, a)

    def wave(self, x, y0, y1, amp, wl, phase, w, col, a=1.0):
        pts = []
        n = 160
        for i in range(n + 1):
            t = i / n
            y = y0 + (y1 - y0) * t
            pts.append((x + amp * math.sin(2 * math.pi * (y - y0) / wl + phase), y))
        self.stroke(pts, w, col, a)

    def downsample(self, s):
        ow, oh = self.w // s, self.h // s
        out = bytearray(ow * oh * 3)
        for y in range(oh):
            for x in range(ow):
                r = g = b = 0.0
                for dy in range(s):
                    base = ((y * s + dy) * self.w + x * s) * 3
                    for dx in range(s):
                        j = base + dx * 3
                        r += self.buf[j]
                        g += self.buf[j + 1]
                        b += self.buf[j + 2]
                n = s * s
                o = (y * ow + x) * 3
                out[o] = int(r / n + 0.5)
                out[o + 1] = int(g / n + 0.5)
                out[o + 2] = int(b / n + 0.5)
        return ow, oh, out


def write_png(path, w, h, rgb):
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        raw += rgb[y * w * 3:(y + 1) * w * 3]
    comp = zlib.compress(bytes(raw), 9)

    def chunk(tag, data):
        c = struct.pack('>I', len(data)) + tag + data
        return c + struct.pack('>I', zlib.crc32(tag + data) & 0xffffffff)

    png = b'\x89PNG\r\n\x1a\n'
    png += chunk(b'IHDR', struct.pack('>IIBBBBB', w, h, 8, 2, 0, 0, 0))
    png += chunk(b'IDAT', comp)
    png += chunk(b'IEND', b'')
    with open(path, 'wb') as f:
        f.write(png)
    return len(png)


def render(size, maskable=False):
    S = size * SS
    c = Canvas(S, S, PAPER)
    u = S / 512.0  # 以 512 为设计基准
    pad = 74 if maskable else 52  # maskable 留更多安全边距

    # 双线展签框：外粗内细
    c.roundrect(pad * u, pad * u, S - pad * u, S - pad * u, 46 * u, BRASS, .95)
    c.roundrect((pad + 9) * u, (pad + 9) * u, S - (pad + 9) * u, S - (pad + 9) * u,
                38 * u, PAPER, 1.0)
    c.roundrect((pad + 20) * u, (pad + 20) * u, S - (pad + 20) * u, S - (pad + 20) * u,
                30 * u, BRASS, .38)
    c.roundrect((pad + 23) * u, (pad + 23) * u, S - (pad + 23) * u, S - (pad + 23) * u,
                28 * u, PAPER, 1.0)

    # 蒸汽三缕
    for i, dx in enumerate((-58, 0, 58)):
        c.wave(256 * u + dx * u, 246 * u, 132 * u, 13 * u, 74 * u, i * 1.7, 11 * u, INK, .82)

    # 碗：下半圆 + 黄铜口沿 + 圈足
    c.disc(256 * u, 322 * u, 104 * u, SAGE, 1.0, half='bottom')
    c.roundrect(150 * u, 306 * u, 362 * u, 320 * u, 7 * u, BRASS, 1.0)
    c.roundrect(216 * u, 424 * u, 296 * u, 436 * u, 6 * u, BRASS, .9)

    # 朱砂小印（右下）
    c.roundrect(318 * u, 352 * u, 366 * u, 400 * u, 6 * u, SEAL, .95)

    ow, oh, rgb = c.downsample(SS)
    return ow, oh, rgb


if __name__ == '__main__':
    here = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out = os.path.join(here, 'icons')
    os.makedirs(out, exist_ok=True)
    for size in (512, 192, 180):
        w, h, rgb = render(size, maskable=(size == 512))
        name = 'icon-%d.png' % size if size != 512 else 'icon-512.png'
        n = write_png(os.path.join(out, name), w, h, rgb)
        print('%-14s %dx%d  %d B' % (name, w, h, n))
    w, h, rgb = render(512, maskable=True)
    write_png(os.path.join(out, 'icon-maskable-512.png'), w, h, rgb)
    print('icon-maskable-512.png ok')
