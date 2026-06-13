#!/bin/bash

# env_check.sh - 环境检测脚本
# 检查 Node.js 环境及版本

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "================================================"
echo "  paopao-team-skills 环境检测"
echo "================================================"

# 检查 Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js 已安装: ${NODE_VERSION}${NC}"
else
    echo -e "${RED}❌ Node.js 未安装${NC}"
    echo "请访问 https://nodejs.org 安装 Node.js (建议 v18+)"
    exit 1
fi

# 提取主版本号
NODE_MAJOR=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)

if [ "$NODE_MAJOR" -lt 16 ]; then
    echo -e "${YELLOW}⚠️  Node.js 版本较低 (v${NODE_MAJOR})，建议升级到 v18+${NC}"
else
    echo -e "${GREEN}✅ Node.js 版本满足要求${NC}"
fi

# 检查 npm (仅用于信息展示，本框架不依赖 npm)
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}ℹ️  npm 已安装: v${NPM_VERSION} (本框架不依赖 npm)${NC}"
fi

# 检查当前目录
echo -e "${GREEN}ℹ️  当前目录: $(pwd)${NC}"

# 检查 paopao-team-skills 目录结构
SKILLS_DIR="$(cd "$(dirname "$0")/.." && pwd)"
echo -e "${GREEN}ℹ️  框架目录: ${SKILLS_DIR}${NC}"

# 验证关键文件存在
echo ""
echo "文件完整性检查:"

check_file() {
    if [ -f "$SKILLS_DIR/$1" ]; then
        echo -e "${GREEN}  ✅ ${1}${NC}"
    else
        echo -e "${RED}  ❌ ${1} 缺失!${NC}"
    fi
}

check_file "main.md"
check_file "roles/project-director/profile.md"
check_file "roles/product-manager/profile.md"
check_file "roles/ui-ux-designer/profile.md"
check_file "roles/fullstack-dev-engineer/profile.md"
check_file "roles/quality-assurance/profile.md"
check_file "tools/file_ops.js"
check_file "tools/context_loader.js"

echo ""
echo "================================================"
echo -e "${GREEN}  环境检测完成${NC}"
echo "================================================"
