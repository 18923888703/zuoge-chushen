#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
做个厨神 → GitHub Pages 部署（纯 REST，不依赖 git / ssh / github.com）

只用 api.github.com，因此在受限网络环境下也能工作。

用法:
    python3 tools/deploy_api.py <GitHub Personal Access Token>
    GITHUB_TOKEN=xxx python3 tools/deploy_api.py
    python3 tools/deploy_api.py            # token 从项目根的 .deploy_token 读取

幂等：重复执行会增量更新已有文件，不会重复建仓。
"""
import base64
import json
import os
import sys
import time
import urllib.error
import urllib.request
from urllib.parse import quote

API = "https://api.github.com"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
REPO = "zuoge-chushen"
SKIP_DIRS = {".git", ".workbuddy", "node_modules", "__pycache__", ".DS_Store", "_src"}
SKIP_FILES = {"deploy_api.py", ".gitignore", ".deploy_token", "deploy-online.command", "deploy-to-github.command"}


def req(method, path, data=None, token=None, expect=(200, 201)):
    # 路径里可能有中文 / 空格 / # 等字符，必须百分号转义，否则 http.client 报 UnicodeEncodeError
    url = API + quote(path, safe="/?=&%")
    body = json.dumps(data).encode() if data is not None else None
    r = urllib.request.Request(url, data=body, method=method)
    r.add_header("Authorization", "Bearer " + token)
    r.add_header("Accept", "application/vnd.github+json")
    r.add_header("User-Agent", "zuoge-chushen-deploy")
    if body:
        r.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(r, timeout=60) as resp:
            raw = resp.read().decode()
            return resp.status, (json.loads(raw) if raw else None)
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        try:
            return e.code, json.loads(raw) if raw else None
        except ValueError:
            return e.code, {"message": raw[:200]}


def collect_files():
    out = []
    for dirpath, dirnames, filenames in os.walk(ROOT):
        dirnames[:] = [d for d in dirnames if d not in SKIP_DIRS]
        for fn in filenames:
            if fn in SKIP_FILES or fn.startswith("._") or fn.endswith(".command"):
                continue  # .command 含本机绝对路径，不入库
            full = os.path.join(dirpath, fn)
            rel = os.path.relpath(full, ROOT).replace(os.sep, "/")
            out.append((rel, full))
    return sorted(out)


def main():
    token = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("GITHUB_TOKEN", "")
    if not token:
        # 兜底：从项目根的 .deploy_token 读取（该文件不参与部署，别提交）
        tf = os.path.join(ROOT, ".deploy_token")
        if os.path.exists(tf):
            with open(tf, "r", encoding="utf-8") as f:
                token = f.read().strip()
    if not token:
        print("✗ 缺少 GitHub Token", file=sys.stderr)
        sys.exit(1)

    print("▸ 校验身份…")
    code, me = req("GET", "/user", token=token)
    if code != 200:
        print("✗ Token 无效或权限不足: %s %s" % (code, me), file=sys.stderr)
        sys.exit(1)
    owner = me["login"]
    print("▸ 已登录: %s" % owner)

    print("▸ 检查仓库 %s…" % REPO)
    code, _ = req("GET", "/repos/%s/%s" % (owner, REPO), token=token)
    if code == 404:
        code, info = req("POST", "/user/repos", token=token, expect=(201,), data={
            "name": REPO,
            "description": "做个厨神 · 面向想学做饭的人的移动端高保真原型（100 道菜馆藏）",
            "private": False,
            "auto_init": True,
        })
        if code != 201:
            print("✗ 建仓失败: %s %s" % (code, info), file=sys.stderr)
            sys.exit(1)
        print("▸ 仓库已创建")
        time.sleep(2)
    else:
        print("▸ 仓库已存在，增量更新")

    files = collect_files()
    print("▸ 共 %d 个文件待上传…" % len(files))

    ok, fail = 0, 0
    for rel, full in files:
        with open(full, "rb") as f:
            content = base64.b64encode(f.read()).decode()

        # 已存在则需带 sha 更新
        code, info = req("GET", "/repos/%s/%s/contents/%s" % (owner, REPO, rel), token=token)
        sha = info.get("sha") if code == 200 and isinstance(info, dict) else None

        data = {"message": "deploy: %s" % rel, "content": content}
        if sha:
            data["sha"] = sha
        code, info = req("PUT", "/repos/%s/%s/contents/%s" % (owner, REPO, rel),
                         token=token, data=data)
        if code in (200, 201):
            ok += 1
            print("  ✓ %s" % rel)
        else:
            fail += 1
            print("  ✗ %s → %s %s" % (rel, code, (info or {}).get("message", "")))
    print("▸ 上传完成: 成功 %d / 失败 %d" % (ok, fail))
    if fail:
        print("✗ 有文件上传失败", file=sys.stderr)
        sys.exit(1)

    print("▸ 开启 Pages…")
    code, _ = req("GET", "/repos/%s/%s/pages" % (owner, REPO), token=token)
    if code == 200:
        print("▸ Pages 已启用")
    else:
        code, info = req("POST", "/repos/%s/%s/pages" % (owner, REPO), token=token, data={
            "build_type": "legacy",
            "source": {"branch": "main", "path": "/"},
        })
        if code == 201:
            print("▸ Pages 已启用")
        else:
            print("! 自动开启失败 (%s %s) → 手动: https://github.com/%s/%s/settings/pages"
                  % (code, (info or {}).get("message", ""), owner, REPO))

    url = "https://%s.github.io/%s/" % (owner, REPO)
    print("▸ 等待站点上线 %s" % url)
    for _ in range(12):
        try:
            with urllib.request.urlopen(url, timeout=20) as resp:
                if resp.status == 200:
                    print("\n\033[1;32m✓ 已上线: %s\033[0m\n" % url)
                    sys.exit(0)
        except Exception:
            pass
        time.sleep(10)
    print("\n! 尚未检测到 200，仓库已就绪，通常几分钟内上线: %s" % url)


if __name__ == "__main__":
    main()
