#!/bin/bash
# 做个厨神 → GitHub Pages 一键部署
#
# 用法：在 macOS 终端里执行
#   bash /Users/yu/WorkBuddy/2026-09-23-21-17-49/tools/deploy-github.sh
#
# 流程：GitHub 授权 → 本地提交 → 建仓推送 → 开启 Pages → 打印访问链接
# 幂等：重复执行只会增量推送，不会重复建仓

set -u
GH="/Users/yu/.workbuddy/binaries/gh/gh"
ROOT="/Users/yu/WorkBuddy/2026-09-23-21-17-49"
REPO="zuoge-chushen"

cd "$ROOT" || exit 1
LOG=/tmp/deploy-terminal.log
: > "$LOG"
exec > >(tee "$LOG") 2>&1
trap 'printf "\n\033[2m完整日志: %s\033[0m\n" "$LOG"' EXIT

say() { printf '\033[1;36m▸ %s\033[0m\n' "$*"; }
die() { printf '\033[1;31m✗ %s\033[0m\n' "$*"; exit 1; }

[ -x "$GH" ] || die "找不到 gh CLI: $GH"

# ---------- 1. 授权 ----------
if ! "$GH" auth status >/dev/null 2>&1; then
  say "需要 GitHub 授权，请按提示在浏览器完成（约 20 秒后出现一次性码）"
  "$GH" auth login --web --git-protocol https
  "$GH" auth status >/dev/null 2>&1 || die "授权未完成"
fi
OWNER=$("$GH" api user --jq '.login')
say "已登录: $OWNER"

# ---------- 2. git 提交 ----------
# 注意：必须先 init，否则 git config 在非仓库目录里会静默失败
[ -d .git ] || { say "初始化本地仓库"; git init -b main >/dev/null; }
if [ -z "$(git config user.name 2>/dev/null)" ]; then
  EMAIL=$("$GH" api user --jq '.email // empty')
  [ -z "$EMAIL" ] && EMAIL="${OWNER}@users.noreply.github.com"
  git config user.name "$OWNER"
  git config user.email "$EMAIL"
  say "git 身份: $OWNER <$EMAIL>"
fi
git add -A
git commit -m "做个厨神 · 100 道菜馆藏高保真原型" >/dev/null 2>&1 || say "无新改动，跳过提交"
say "提交完成 $(git rev-parse --short HEAD)"

# ---------- 3. 建仓并推送 ----------
if git remote get-url origin >/dev/null 2>&1; then
  say "推送到已有远端"
  git push -u origin main >/dev/null 2>&1 || die "推送失败"
elif "$GH" repo view "$REPO" >/dev/null 2>&1 || curl -sS -m 15 -o /dev/null "https://api.github.com/repos/$OWNER/$REPO"; then
  say "仓库 $REPO 已存在于你的账号下，直接关联并推送"
  git remote remove origin >/dev/null 2>&1
  git remote add origin "https://github.com/$OWNER/$REPO.git"
  git push -u origin main >/dev/null 2>&1 || die "推送失败"
else
  say "创建公开仓库 $REPO 并推送"
  "$GH" repo create "$REPO" --public --source=. --remote=origin --push >/dev/null 2>&1 \
    || die "建仓失败，请手动到 https://github.com/new 创建后重试"
fi
say "仓库就绪 https://github.com/$OWNER/$REPO"

# ---------- 4. 开启 Pages ----------
if curl -sS -m 20 -o /dev/null -w "%{http_code}" "https://api.github.com/repos/$OWNER/$REPO/pages" | grep -q 200; then
  say "Pages 已启用"
else
  say "开启 Pages（main 分支 / 根目录）"
  "$GH" api -X POST "repos/$OWNER/$REPO/pages" \
    -f "source[branch]=main" -f "source[path]=/" -f build_type=legacy >/dev/null 2>&1 \
    || printf '\033[33m! 自动开启失败，请手动: https://github.com/%s/%s/settings/pages → Deploy from branch → main\033[0m\n' "$OWNER" "$REPO"
fi

# ---------- 5. 等待上线 ----------
URL="https://${OWNER}.github.io/${REPO}/"
say "等待站点上线 $URL"
for i in $(seq 1 30); do
  if [ "$(curl -sS -m 15 -o /dev/null -w '%{http_code}' "$URL" 2>/dev/null)" = "200" ]; then
    printf '\n\033[1;32m✓ 已上线: %s\033[0m\n\n' "$URL"
    printf '%s' "$URL" | pbcopy 2>/dev/null && printf '\033[2m(链接已复制到剪贴板)\033[0m\n'
    exit 0
  fi
  sleep 10
done
printf '\n\033[33m! 尚未检测到 200，但仓库已就绪，通常几分钟内上线: %s\033[0m\n' "$URL"
exit 0
