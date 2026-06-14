#!/usr/bin/env node

/**
 * pm_research.js - PM 调研分析工具集
 * @author: RenLishisan
 * @description: 搜索查询生成 + 市场调研 + 竞品分析
 *   + 方案推荐的结构化框架输出工具。
 *   先 search-queries 生成搜索词，联网搜索后，
 *   再用 market/competitive/recommend 结构化。
 * @time: 2026/6/14
 *
 * 使用方式:
 *   node pm_research.js search-queries --domain <领域>
 *   node pm_research.js market --domain <领域> --target <目标>
 *   node pm_research.js competitive --product <名> --competitors <列表>
 *   node pm_research.js recommend --options <列表> --weights <权重>
 *
 * 零依赖，仅使用 Node.js 原生模块
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// 框架定义
// ---------------------------------------------------------------------------

const FRAMEWORKS = {

  /** 市场调研分析框架 */
  market: {
    fields: [
      '行业概述',
      '市场规模 (TAM/SAM/SOM)',
      '增长率与趋势',
      '主要玩家格局',
      '技术/政策环境',
      '用户痛点分级',
      '机会窗口分析'
    ],
    tamTemplate: {
      tam: '总可用市场（全部潜在用户）',
      sam: '可服务市场（我方能力覆盖）',
      som: '可获得市场（短期可实现）'
    }
  },

  /** 竞品分析维度 */
  competitive: {
    dimensions: [
      '功能完整度',
      '用户体验',
      '技术架构',
      '商业模式',
      '市场份额',
      '定价策略',
      '生态开放度'
    ],
    swotFields: ['优势', '劣势', '机会', '威胁']
  },

  /** 方案推荐评分模型 */
  recommend: {
    defaultWeights: {
      '开发成本': 0.25,
      '用户覆盖': 0.20,
      '商业价值': 0.30,
      '技术风险': 0.15,
      '扩展性': 0.10
    },
    scale: [1, 10]
  }
};

// ---------------------------------------------------------------------------
// 核心函数
// ---------------------------------------------------------------------------

/**
 * 生成市场调研框架输出
 */
function analyzeMarket(domain, target) {
  const output = {
    tool: 'pm_research.js',
    command: 'market',
    input: { domain, target },
    framework: FRAMEWORKS.market.fields.map(f => ({ field: f, status: '需补充' })),
    tamSamSom: FRAMEWORKS.market.tamTemplate,
    summary: null
  };

  if (domain) {
    output.summary = `正在分析 "${domain}" 领域` +
      (target ? `, 目标市场: "${target}"` : '') +
      '。请 AI PM 根据以下框架填充调研内容。';
  }

  return { success: true, data: output };
}

/**
 * 生成联网搜索查询建议
 * 覆盖行业、竞品、用户、技术四个维度
 */
function generateSearchQueries(domain, target, focus) {
  if (!domain) {
    return { success: false, error: '缺少 --domain 参数' };
  }

  const t = target ? ` ${target}` : '';
  const d = domain;

  // 按搜索维度组织的查询模板
  const queryTemplates = {
    industry: [
      `${d}${t} 行业规模 市场规模 2025 2026`,
      `${d}${t} 行业报告 趋势分析`,
      `${d}${t} 市场现状 发展前景`,
      `${d}${t} 用户规模 渗透率`,
    ],
    competitors: [
      `${d}${t} 主要玩家 市场份额`,
      `${d}${t} 竞品分析 产品对比`,
      `${d}${t} 头部产品 排名`,
      `${d}${t} 创业公司 新玩家`,
    ],
    users: [
      `${d}${t} 用户需求 痛点`,
      `${d}${t} 用户评价 反馈`,
      `${d}${t} 使用场景 用户画像`,
      `${d}${t} 用户流失原因`,
    ],
    technology: [
      `${d}${t} 技术方案 架构 对比`,
      `${d}${t} 关键技术 趋势`,
      `${d}${t} 技术选型 最佳实践`,
      `${d}${t} 开源项目 解决方案`,
    ],
    business: [
      `${d}${t} 商业模式 盈利方式`,
      `${d}${t} 定价策略 收费标准`,
      `${d}${t} 投融资 行业动态`,
      `${d}${t} 政策法规 合规要求`,
    ]
  };

  // 按 focus 筛选
  const keys = focus
    ? focus.split(',').map(s => s.trim()).filter(k => queryTemplates[k])
    : Object.keys(queryTemplates);

  const queries = {};
  for (const key of keys) {
    queries[key] = queryTemplates[key];
  }

  // 汇总推荐搜索词
  const allQueries = Object.values(queries).flat();

  const output = {
    tool: 'pm_research.js',
    command: 'search-queries',
    input: { domain, target, focus: focus || 'all' },
    search_dimensions: keys.map(k => ({
      dimension: k,
      intent: DIMENSION_INTENT[k] || '了解行业概况',
      count: queries[k].length
    })),
    suggested_queries: allQueries,
    search_priority: [
      '1. 先搜 industry 维度，了解市场全貌',
      '2. 再搜 competitors，识别主要对手',
      '3. 然后搜 users，理解用户需求',
      '4. 最后搜 technology + business',
    ],
    usage: '对每个搜索词执行联网搜索，将结果填入 market 或 competitive 框架。',
    total_queries: allQueries.length
  };

  return { success: true, data: output };
}

const DIMENSION_INTENT = {
  industry: '了解行业规模、趋势、市场全貌',
  competitors: '识别主要竞品、市场份额、产品对比',
  users: '理解用户需求、痛点、使用场景',
  technology: '调研技术方案、架构选型、技术趋势',
  business: '了解商业模式、定价、投融资、政策'
};

/**
 * 生成竞品分析框架
 */
function analyzeCompetitive(product, competitors, dimensions) {
  const dimList = dimensions
    ? dimensions.split(',').map(s => s.trim())
    : FRAMEWORKS.competitive.dimensions;

  const compList = competitors
    ? competitors.split(',').map(s => s.trim())
    : [];

  // 构建功能矩阵模板
  const matrix = [];
  for (const dim of dimList) {
    const row = { dimension: dim };
    for (const comp of compList) {
      row[comp] = '待评估';
    }
    if (product) row[`${product}(我方)`] = '待评估';
    matrix.push(row);
  }

  // SWOT 模板
  const swotTemplates = {};
  for (const comp of [...compList, product || '我方'].filter(Boolean)) {
    swotTemplates[comp] = {
      strengths: [],
      weaknesses: [],
      opportunities: [],
      threats: []
    };
  }

  return {
    success: true,
    data: {
      tool: 'pm_research.js',
      command: 'competitive',
      input: { product, competitors, dimensions: dimList },
      matrix,
      swot: swotTemplates,
      summary: compList.length > 0
        ? `将对比 ${compList.length} 个竞品` +
          (product ? ` 与 "${product}"` : '')
          + `，覆盖 ${dimList.length} 个维度。`
        : '请提供竞品列表（用逗号分隔）。'
    }
  };
}

/**
 * 方案推荐加权评分
 */
function recommendSolution(options, weights) {
  const optList = options
    ? options.split(',').map(s => s.trim())
    : [];

  const weightMap = {};
  if (weights) {
    const pairs = weights.split(',');
    for (const pair of pairs) {
      const [key, val] = pair.split(':');
      if (key && val) weightMap[key.trim()] = parseFloat(val.trim());
    }
  }

  const finalWeights = Object.keys(weightMap).length > 0
    ? weightMap
    : FRAMEWORKS.recommend.defaultWeights;

  const dims = Object.keys(finalWeights);

  // 构建评分模板
  const scoreTable = [];
  for (const opt of optList) {
    const row = { option: opt, scores: {}, weightedTotal: 0 };
    for (const dim of dims) {
      row.scores[dim] = { score: '待评分', weight: finalWeights[dim] };
    }
    scoreTable.push(row);
  }

  return {
    success: true,
    data: {
      tool: 'pm_research.js',
      command: 'recommend',
      input: { options: optList, weights: finalWeights },
      framework: 'RICE 加权评分',
      scale: '1-10（10 为最优）',
      scoreTable,
      formula: '总分 = Σ(评分 × 权重)',
      summary: optList.length > 0
        ? `正在评估 ${optList.length} 个方案，` +
          `使用 ${dims.length} 个维度，请 AI PM 填入评分。`
        : '请提供方案列表（用逗号分隔）。'
    }
  };
}

// ---------------------------------------------------------------------------
// CLI 入口
// ---------------------------------------------------------------------------

function printUsage() {
  console.log(`
用法:
  node pm_research.js <command> [options]

命令:
  search-queries  生成联网搜索关键词（优先使用）
    --domain <领域>     行业/领域名称（必填）
    --target <目标>     目标市场描述
    --focus <维度>      搜索维度 industry,competitors,
                       users,technology,business

  market       市场调研框架
    --domain <领域>     行业/领域名称
    --target <目标>     目标市场描述

  competitive  竞品分析框架
    --product <名称>    我方产品名称
    --competitors <列表> 竞品列表（逗号分隔）
    --dimensions <维度>  分析维度（逗号分隔）

  recommend    方案推荐评分
    --options <列表>    候选方案列表（逗号分隔）
    --weights <权重>    维度权重（如 "成本:0.3,价值:0.4"）

示例:
  node pm_research.js search-queries --domain "在线协作" --target "中小企业"
  node pm_research.js market --domain "在线协作" --target "中小企业"
  node pm_research.js competitive --product "我们的App" \\
    --competitors "竞品A,竞品B" --dimensions "功能,体验,价格"
  node pm_research.js recommend --options "方案A,方案B" \\
    --weights "成本:0.25,覆盖:0.20,价值:0.30,风险:0.15,扩展:0.10"
`);
}

function parseArgs(args) {
  const parsed = {};
  for (let i = 0; i < args.length; i++) {
    if (args[i].startsWith('--')) {
      const key = args[i].slice(2);
      const val = args[i + 1] && !args[i + 1].startsWith('--')
        ? args[i + 1]
        : true;
      parsed[key] = val;
      if (val !== true) i++;
    }
  }
  return parsed;
}

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    printUsage();
    process.exit(0);
  }

  const command = args[0].toLowerCase();
  const options = parseArgs(args.slice(1));

  let result;

  switch (command) {
    case 'market':
      result = analyzeMarket(options.domain, options.target);
      break;

    case 'competitive':
      result = analyzeCompetitive(
        options.product,
        options.competitors,
        options.dimensions
      );
      break;

    case 'recommend':
      result = recommendSolution(options.options, options.weights);
      break;

    case 'search-queries':
    case 'queries':
    case 'sq':
      result = generateSearchQueries(
        options.domain,
        options.target,
        options.focus
      );
      break;

    default:
      console.error(`❌ 未知命令: ${command}`);
      printUsage();
      process.exit(1);
  }

  if (result.success) {
    console.log(JSON.stringify(result.data, null, 2));
  } else {
    console.error(`❌ ${result.error}`);
    process.exit(1);
  }
}

main();
