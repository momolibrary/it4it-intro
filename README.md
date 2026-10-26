# IT4IT 入门 · 交互式小课

一套纯静态的引导式网页，用 7 站把 **IT4IT**（The Open Group 的 IT 参考架构）从“听不懂的名词”讲到“能画出来、能讲给别人听”。

> 仓库：<https://github.com/momolibrary/it4it-intro> · 用于阶段性学习与研究，内容会随理解更新。

## 怎么打开

直接双击 `index.html` 即可（无需安装、无需联网、无需构建）。建议用 Chrome / Edge / Safari 打开。
如果想从本地服务器打开：

```bash
git clone https://github.com/momolibrary/it4it-intro.git
cd it4it-intro
python3 -m http.server 8080
# 然后访问 http://localhost:8080
```

学习进度、答题记录、自检清单都保存在浏览器本地（localStorage），换设备不会同步。

## 七站路径

| 站点 | 文件 | 你会得到 |
|---|---|---|
| 起点 | `index.html` | 一句话答案 + 学习地图 |
| 1 · 问题 | `1-silos.html` | 点一下切换「工具竖井 / 数据主线」对比图 |
| 2 · 价值链 | `2-value-chain.html` | IT4IT 的三层结构；v2.x 为什么是四条流、v3.0 如何变成七条 |
| 3 · 价值流 | `3-value-streams.html` | 先讲 v2.x 的 4 条，再讲 v3.0 的 7 条与 4 → 7 对照表；v3.0 深挖：S2P → Evaluate / Explore；实战 playbook（信息清单 / 跑法 / 合格线 / 产物模板 / 可视化） |
| 4 · 数据 | `4-data-model.html` | 九个数据对象 + 一个需求的完整旅程动画 |
| 5 · 定位 | `5-relations.html` | 和 ITIL / DevOps / TOGAF / COBIT 的关系、何时值得用 |
| 6 · 自测 | `6-quiz.html` | 8 道题，即时判分 + 解析 |
| 7 · 速查 | `7-summary.html` | 一页纸速查卡 + 自检清单 |

## 目录结构

```
IT4IT/
├── index.html              # 封面 + 学习地图
├── 1-silos.html … 7-summary.html
├── assets/
│   ├── style.css           # 全部视觉规范（配色、卡片、图表、响应式）
│   └── app.js              # 步骤条、进度记录、标签页、测验引擎
├── preview/                # 渲染截图，方便快速预览
├── LICENSE                 # MIT
└── README.md
```

- 零依赖：没有 npm、没有 CDN、没有网络请求。
- 响应式：手机端同样可用（价值流图表可横向滑动）。
- 打印/投屏友好：深色文字 + 白底卡片。

## 内容口径说明（重要）

1. **“IT for IT”** 是坊间对 IT4IT 的通俗读法，**官方并未正式给出这个缩写展开**。但它“让 IT 像一家服务公司一样为自身和业务提供 IT 能力”的内核，与标准意图一致。
2. **第 3 站的主线是 v3.0 的 7 条价值流**；下面这 4 条及其阶段名是最广为流传的 **v2.x** 口径，页面把它作为历史背景与 4 → 7 对照保留：
   - S2P：Strategy → Service Portfolio → Demand → Selection
   - R2D：Plan & Design → Develop → Test → Deploy
   - R2F：Publish → Subscribe → Fulfill → Measure
   - D2C：Detect → Diagnose → Change → Resolve
3. **v3.0（2022）** 引入了「数字产品（Digital Product）」与「数字产品主干（Digital Product Backbone）」，并把价值流重组为 **7 条**：Evaluate / Explore / Integrate / Deploy / Release / Consume / Operate。按职责整理的 4 → 7 对照是：S2P → Evaluate + Explore；R2D → Explore（需求/设计）+ Integrate + Deploy；R2F → Release + Consume；D2C → Operate。这是职责对照，不是官方逐条改名表；第 3 站有完整表格，第 7 站有速查版。
4. 官方 Level 1 用**五个核心概念**描述架构：价值流、功能组件、服务生命周期数据对象、服务模型主干数据对象、关系。站内为了便于记忆收敛成“三层”，第 4 站有对应说明。

## 主要参考

- [The Open Group · IT4IT 官方页面](https://www.opengroup.org/it4it)
- [The Open Group · IT4IT FAQ](https://www.opengroup.org/membership/forums/it4it-forum/it4it-faq)
- [IT4IT Service Model Guide v2.3（PDF）](https://www.opengroup.org/sites/default/files/pdf/IT4IT_Service_Model_Guide_v2_3.pdf)
- [IT4IT Conformance Requirements（PDF，含功能组件清单）](https://certification.opengroup.org/docs/IT4IT_Conformance_Requirements.pdf)

## 更新记录

- 2026-10：新增第 3 站「v3.0 深挖：S2P → Evaluate / Explore」与「实战 playbook（信息清单 / 跑法 / 合格线 / 产物模板 / 可视化）」；发布到 GitHub。

## 许可

- 代码（HTML / CSS / JS）与本站原创的讲解文字、图示：**MIT License**（见 `LICENSE`）。
- 文中涉及的 IT4IT 标准概念、阶段名与数据对象属于 The Open Group；本站为中文教学解读与落地整理，引用处已标注来源，不代表 The Open Group 官方观点。IT4IT™ 是 The Open Group 的商标。

> 本材料为教学科普，非 The Open Group 官方出版物。
