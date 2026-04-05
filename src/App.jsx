import React, { useState, useEffect } from 'react';

// --- 题库数据 (48题) ---
const questions = [
  { q: "经历了一周的打工/早八，周末你选择怎么回血？", a: "攒局！约朋友去逛吃嗨皮，人多才热闹", b: "躺平！拉上窗帘在被窝刷剧，谁也别管我" },
  { q: "被朋友拉去全是陌生人的KTV局，你通常是？", a: "麦霸兼气氛组，火速跟全场打成一片", b: "边缘果盘杀手，默默吃瓜玩手机" },
  { q: "心情大emo的时候，你更倾向于？", a: "找闺蜜/兄弟疯狂吐槽，倒完苦水就爽了", b: "一个人戴耳机听歌消化，不想说话" },
  { q: "冲浪看到超级搞笑的沙雕表情包，你的第一反应？", a: "独乐乐不如众乐乐，立刻群发给5个群", b: "嘴角上扬，默默存进自己的表情包库" },
  { q: "公司/学校突然宣布要搞两天一夜大团建，你心里想？", a: "好耶！公费出去玩，顺便交交新朋友", b: "救命！放过我吧，宁愿在工位打螺丝" },
  { q: "等网红餐厅等位超无聊，你会干嘛？", a: "顺势跟旁边桌的人搭个话，聊聊哪道菜好吃", b: "沉浸式发呆或狂刷短视频，自带社恐结界" },
  { q: "手机突然显示一个本地的陌生号码来电，你会？", a: "直接接听，万一是外卖或者有什么急事呢", b: "等它响完，真有急事对方肯定会发短信的" },
  { q: "在外面疯狂社交了一整天，回到家关上门的那一刻，你觉得？", a: "意犹未尽，今天玩得真嗨！", b: "感觉被吸干了阳气，社交电量彻底清零" },
  { q: "你的理想生日怎么过？", a: "搞个大派对，把认识的好朋友都叫来轰趴", b: "只和两三个最铁的朋友找个安静的地方吃顿饭" },
  { q: "玩组队网游的时候，你的习惯是？", a: "必须开麦连麦，主打一个全场沟通疯狂指挥", b: "孤狼玩家，全局静音自己默默Carry" },
  { q: "挤地铁通勤，你最希望发生什么？", a: "偶遇一个好说话的同事，一路聊天解闷", b: "祈祷千万别碰见任何熟人，不想寒暄" },
  { q: "走在步行街突然被举着话筒的街访博主拦下，你会？", a: "兴奋凑上去配合回答，说不定还能火一把", b: "眼神躲避，疯狂摆手赶紧溜走" },
  
  { q: "跟着网上的美食教程做饭，你的操作是？", a: "严格遵守“盐5克，生抽10毫升，煮3分钟”", b: "主打随缘，“少许”“适量”全凭灵魂手感" },
  { q: "朋友突然提出一个非常离谱的创业点子，你会？", a: "帮他算算成本、竞品和现实可行性", b: "觉得超酷！并且帮他把点子开得更大更离谱" },
  { q: "买新手机时，你首要考虑的因素是？", a: "处理器跑分、电池容量、像素参数和性价比", b: "外观颜色绝美、拿在手里的质感和当时的心动" },
  { q: "拼装刚买的宜家小柜子，你会？", a: "先把零件铺好，严格按照说明书一步一步来", b: "扫一眼成品图纸，直接上手盲拼，拼错再拆" },
  { q: "跟别人安利一部你超爱的剧，你会怎么说？", a: "详细复述剧情主线、人物关系和高潮转折", b: "疯狂输出这部剧的“绝美氛围感”和隐藏寓意" },
  { q: "看到天上有一朵形状奇特的云，你的第一反应？", a: "“这云挺厚啊，看着像是要下雨了。”", b: "“快看！那朵云好像一只踩着滑板的柯基！”" },
  { q: "朋友聚会教大家玩一个全新桌游，你的学习方式是？", a: "先把规则书从头到尾听明白、盘清楚再开始", b: "别废话了直接开一局！边玩边学试错就懂了" },
  { q: "听到“苹果”两个字，你脑海里最先闪过什么？", a: "红红的、脆甜的水果，或者菜市场", b: "牛顿的头、白雪公主的毒药或者乔布斯" },
  { q: "布置自己的新卧室，你会怎么买东西？", a: "先量好尺寸，买实用、耐脏、百搭的收纳神器", b: "买一堆奇奇怪怪、毫无用处但直击灵魂的氛围感摆件" },
  { q: "看小说或追剧时，你最受不了什么？", a: "设定崩塌，剧情逻辑有明显的硬伤", b: "气氛烘托不到位，剧情干瘪没有想象空间" },
  { q: "别人跟你描述一个刚出的新奇数码产品，你会问？", a: "“它具体能干嘛？大概卖多少钱？”", b: "“哇，感觉很有意思！它给人的感觉像什么？”" },
  { q: "计划明年的个人大目标，你的表述更接近？", a: "“我要在12月前存下5万块钱，考下2个证”", b: "“我要去探索世界，变成一个更自由的人”" },

  { q: "闺蜜/兄弟被对象渣了，找你哭诉，你会怎么做？", a: "帮ta理清对方有多渣，分析利弊果断劝分", b: "啥也不说，跟着一起痛骂、陪着一起掉眼泪" },
  { q: "跟你对接的同事犯了小错连累了你，你会？", a: "直接指出问题所在，要求赶紧出补救方案", b: "怕对方太内疚，委婉提醒甚至默默帮着改了" },
  { q: "看那种带催泪故事的选秀节目，你的态度是？", a: "实力不行就是不行，我不吃卖惨那一套", b: "听到选手的悲惨身世，忍不住流着泪给他投票" },
  { q: "和伴侣吵架时，你最常暴击对方的句式是？", a: "“我们别扯别的，先来梳理一下这件事的对错”", b: "“就算你占理，但你刚才吼我的态度让我很难过！”" },
  { q: "在天桥上看到卖惨乞讨的人，你心里通常怎么想？", a: "“新闻里说很多都是职业骗子，别上当，快走”", b: "“万一他是真的遇到了困难呢？太可怜了给点钱吧”" },
  { q: "给别人提改进意见，你习惯用什么话术？", a: "直奔主题，“良药苦口，我是为你好才直说”", b: "经典三明治法则：先夸一波，小心提出问题再鼓励" },
  { q: "遇到两难的人生选择（如选offer），你会怎么定？", a: "拿出一张纸，理性列出A和B的“优缺点打分表”", b: "抛硬币，或者在深夜静下心来听从内心的直觉" },
  { q: "听到公司的劲爆离谱大八卦，你的第一反应？", a: "保持怀疑：“证据呢？这逻辑说不通吧。”", b: "代入当事人：“天呐，那ta现在得多崩溃多尴尬啊。”" },
  { q: "作为组长，必须要辞退一个表现很差的组员，你会？", a: "公事公办，为了整个团队的进度，果断谈话", b: "内心疯狂拉扯，深感愧疚，甚至为此失眠好几天" },
  { q: "遇到在群里因为工作压力突然崩溃大哭的队友，你会？", a: "提醒死线快到了，理智要求ta尽快调整状态", b: "极度心疼，甚至主动提出分担ta的那部分工作" },
  { q: "挑选送给最好朋友的生日礼物，你会选？", a: "ta购物车放了很久、刚好缺的一个实用高科技家电", b: "你亲手制作、写满你们回忆的定制相册/手账" },
  { q: "看到网上极端的负面社会新闻，你的反应是？", a: "保持理智，让子弹飞一会儿，等官方全面通报", b: "瞬间共情受害者，气得握紧拳头甚至吃不下饭" },

  { q: "大周末的早上，你通常的状态是？", a: "定好8点的闹钟起床，绝不能浪费大好周末时光", b: "睡到自然醒，醒来是下午2点，那就从2点开始过" },
  { q: "明天就要出门长途旅游了，你的行李打包进度是？", a: "提前三天就列好长长的清单，全部分装收纳完毕", b: "出发前一晚（甚至去机场前两小时）开启极限狂塞" },
  { q: "你的电脑桌面/手机APP布局，看起来像什么？", a: "分类建文件夹，生活、工作、娱乐排列得整整齐齐", b: "各种文件图标随便乱放，全靠神秘的“肌肉记忆”找" },
  { q: "去超市采购日用品，你的购物轨迹是？", a: "直奔主题，买完备忘录清单上的东西立刻结账走人", b: "逛到哪算哪，最后买了一堆计划外零食，忘了买纸巾" },
  { q: "约好周六出去玩，对方突然周五晚说要改时间，你会？", a: "极度难受和烦躁，感觉我全天的计划都被打乱了！", b: "无所谓啊，不用早起了，正好趁机干点别的事儿" },
  { q: "交水电费、还信用卡，你属于哪种风格？", a: "设置自动扣款，或者账单一出立马主动去交清", b: "经常忘，一直拖到收到“最后期限警告”才去付" },
  { q: "周末出门吃晚饭找餐厅，你会怎么操作？", a: "提前两天看好全网攻略，订好靠窗的座位", b: "走到繁华的街上，看着哪家顺眼/味道香就进哪家" },
  { q: "在外面玩，手机电量剩下20%且变红，你的状态？", a: "极度缺乏安全感，四处张望满世界找共享充电宝", b: "丝毫不慌，“20%能干的事可太多了”，用到1%再说" },
  { q: "面对工作或学习的DDL（最后期限），你的真实写照？", a: "提前几天稳稳搞定，必须留出检查和修改的富裕时间", b: "DDL才是第一生产力！最后两小时飙升肾上腺素创造奇迹" },
  { q: "每年初立下新年愿望和计划时，你通常会怎么做？", a: "写下具体的打卡表格和每个月的里程碑进度", b: "随便立个大概的Flag，主打一个随缘推进、重在参与" },
  { q: "写日记或记账的习惯，你更符合哪一种？", a: "每天雷打不动记录，看着连续打卡的日历很有成就感", b: "兴致来了洋洋洒洒写八百字，然后直接断更三个月" },
  { q: "追一部最近爆火的剧，你喜欢的节奏是？", a: "每天下班固定看一集，按部就班当成日常消遣", b: "一旦看进去就停不下来，熬通宵也要一口气狂刷到底" }
];

// --- 16型全量数据 (包含引流短文案 + 专业长报告) ---
const resultData = {
  "AAAA": { 
    title: "清醒领航者", tags: "社交汲取 | 细节务实 | 理性通透 | 规划有序",
    shortDesc: "在人群中掌控全局的你，凡事讲逻辑与规划。别人以为你无坚不摧，但夜深疲惫时，计划表背后的脆弱谁来懂？想知道谁能一眼看穿你的逞强？",
    core: "该人格类型具备高度的现实定向与系统化掌控欲。其内在动机源于对确定性、秩序感与效能的最大化追求。在行为模式上，他们擅长在社交互动中捕捉客观数据与核心诉求，摒弃主观情绪干扰，并通过严密的逻辑推演将其转化为具象可行的战略蓝图。他们是现实环境中的“秩序重构者”。",
    strengths: ["面临复杂混沌局面时，能迅速抽丝剥茧、厘清主次矛盾并排定优先级。", "具备卓越的认知重评能力，将危机转化为任务节点，抗压阈值极高。", "擅长基于客观利益最大化原则，精准匹配人际与物质资源。"],
    weaknesses: ["面对突发不可控变量时，容易触发强烈的认知失调与焦虑。", "倾向于将事物及人际关系指标化，常因向下兼容而感到深度疲惫。", "过于结果导向，容易剥夺自身在过程中的心流体验。"],
    career: "高度契合项目管理、战略运营、高级财务或法务岗。工作风格为结果导向、高标准化执行。需规避权责边界模糊、缺乏标准化作业程序（SOP）的草创环境。",
    romance: "倾向于缔结“同盟型”亲密关系，需求高成熟度、内核稳定的伴侣。雷区：将恋爱关系KPI化；在伴侣表达情感诉求时过度运用逻辑分析进行说教。",
    social: "沟通风格直率、高效、目的性强。建议在提供建设性批评前，适度植入前置的情感确认（如肯定对方的付出），以降低他人的防御机制。",
    growth: "需进行“正念延迟”的刻意练习，学会在系统运转良好时允许局部的失控。明确“课题分离”原则，将心智资源从外界掌控转移至内在觉察。"
  },
  "AAAB": { 
    title: "游刃有余的玩家", tags: "社交汲取 | 细节务实 | 理性通透 | 随性自在",
    shortDesc: "热闹是你，清醒也是你。你在人群中捕捉细节，却从不给自己设限。看似随性游走，实则心里门儿清。但过于理智的松弛，会不会让你错过真心？",
    core: "该类型展现出高度的现实适应性与战术灵活性。其内在动机在于追求当下的效能与环境交互的流畅感，抵触僵化的规则与长期束缚。行为模式表现为：在复杂的社交生态中精准捕捉规则漏洞与利益结合点，依靠高超的临场反应和极低的情绪唤起解决问题，是去中心化的实用主义者。",
    strengths: ["卓越的敏捷应变力，在高度不确定环境中迅速调整策略。", "不受情感勒索与道德绑架干扰，在博弈中保持客观理性边界。", "内核低耗能，对负面反馈展现出极强的心理免疫力与钝感。"],
    weaknesses: ["习惯对长期承诺保持警惕，易在深夜陷入存在主义的虚无泥沼。", "过度理智化使其在需要情感托付时，面临社会支持系统薄弱的窘境。", "用幽默和战术勤奋掩盖战略上的逃避，抗拒深入内核的剖析。"],
    career: "极度契合公关危机处理、大客户销售、市场破局开拓者。需规避高度科层制、僵化刻板的流水线作业体系及长期枯燥的研究环境。",
    romance: "追求轻松、低干涉度的伴侣关系，看重智力匹敌与生活情趣。雷区：回避深层情感暴露与长期承诺；习惯用插科打诨逃避严肃情感危机。",
    social: "沟通风格机智、灵活且擅长化解尴尬。建议在面对深交对象时，主动降低心理防御，适度展露个人的脆弱与笨拙，建立韧性社会连接。",
    growth: "开展“延迟满足”专项训练。尝试在非功利性领域投入长期的时间资本，学会在枯燥积累期中寻找深度内在动机，以锚定漂泊的心智。"
  },
  "AABA": { 
    title: "治愈系大管家", tags: "社交汲取 | 细节务实 | 共情柔软 | 规划有序",
    shortDesc: "你是大家眼里靠谱的小太阳，总能有条不紊照顾所有人的情绪。可你为迎合期待而咽下的委屈，谁来倾听？你性格深处隐藏着一个极强的反转能量。",
    core: "该类型是现实环境中的“情绪与秩序双重维护者”。内在动机源于维持和谐人际生态与建立稳固安全感。他们拥有敏锐的共情雷达，能捕捉微小情绪波动，并将关怀转化为具象化、条理化的支持行动。通过无微不至的系统性照料，确立自身在群体中的核心价值。",
    strengths: ["能将虚无缥缈的同理心，转化为切实解决他人生活痛点的周密方案。", "具备极强的承诺兑现能力，是组织与社群中最值得信赖的基础节点。", "通过高度利他行为与情绪安抚，建立起不容置疑的隐性领导力。"],
    weaknesses: ["极易陷入过度承担与讨好型心理困境，习惯性让渡自身边界。", "长期内化他人情绪垃圾，容易导致严重的同情疲劳。", "不善于正向表达个体诉求，产生不被重视的隐性委屈感。"],
    career: "适配人力资源（HRBP）、客户成功管理、医疗教育后勤等。严重不适配奉行丛林法则、需进行高频人员淘汰的竞争导向型企业。",
    romance: "典型的付出型伴侣，需求对方的感恩回馈与同等的稳定性承诺。雷区：易吸引高索取特质对象；倾向于采用生闷气等被动攻击而非直接沟通。",
    social: "沟通风格温和婉转，极力避免冲突。建议建立一套结构化的“拒绝话术框架”，认识到划定清晰心理边界是保护自己也是健康关系的基础。",
    growth: "需进行自我中心化重构。定期规划专属绝对私人时间，停止对他人课题的越俎代庖，接纳“自己无法满足所有人”的客观事实。"
  },
  "AABB": { 
    title: "人间小太阳", tags: "社交汲取 | 细节务实 | 共情柔软 | 随性自在",
    shortDesc: "穿梭在人群中的快乐小狗！你敏锐捕捉善意，凭直觉享受当下的热烈。但太容易共情，常让你在深夜陷入莫名内耗吧？你的专属解药正在生成。",
    core: "该类型展现为高度的环境敏感性与即时体验导向。内在动机在于追求情感共鸣的饱和度与当下感官的愉悦感。他们向外界毫无保留地开放感知通道，以极高热情投入人际互动，对现实生活中的美学与情感细节具有极强的捕捉力，是天然的积极情绪感染者。",
    strengths: ["具备极其优秀的共情穿透力，能迅速打破防备提供高质量情绪抚慰。", "拥有发掘平凡事物中独特趣味的美学天赋，极擅调节团队氛围。", "不拘泥于陈规，在变化的环境中总能随遇而安，迅速建立新联结。"],
    weaknesses: ["心理边界模糊，呈现“情绪海绵效应”，易因过度吸收负能量而过载。", "缺乏长远结构化规划，面临财务或生涯硬性指标时易陷入恐慌。", "因过度渴望连接而产生错失恐惧（FOMO），不敢拒绝无效社交。"],
    career: "适配活动策划、新媒体运营、体验式营销、文旅体验岗。极度不适配要求机械重复、数据审计或纪律极其严苛的高科层制环境。",
    romance: "追求高情感浓度与浪漫体验的伴侣关系，需求即时反馈与无条件接纳。雷区：情绪起伏大时易冲动表达；将安全感过度依附于伴侣。",
    social: "沟通风格生动且极具感染力。建议遭遇负能量倾诉时，刻意拉开物理与心理双重距离；学会在社交狂欢后进行必要的“能量戒断”与独处。",
    growth: "引入微型秩序锚点。通过每日固定的一项低耗能微习惯（如冥想、记账）来对抗不确定感。学会为负面情绪命名，提升情绪管理颗粒度。"
  },
  "ABAA": { 
    title: "高维造梦师", tags: "社交汲取 | 灵感畅想 | 理性通透 | 规划有序",
    shortDesc: "你是自带光芒的造梦者，用天马行空的灵感和严密规划，把不可能变现实。别人惊叹你的高效，你却深知高处不胜寒。下一次转折点藏在哪里？",
    core: "该类型融合了高度的抽象构建能力与严密的现实执行力。其内在动机是对现有系统的优化与对未来愿景的绝对掌控。在广泛的社交中汲取趋势灵感，利用强大前瞻性思维构建颠覆性蓝图，并立即调用理性批判框架与周密计划，将抽象的“可能性”转化为具象的战略部署。",
    strengths: ["兼具宏观视野与微观拆解能力，能够跨界整合资源完成体系构建。", "擅长输出极具逻辑性与未来感的价值观，迅速统御群体心智。", "在推进愿景过程中能理智排除情感干扰，具备极强的挫折耐受力。"],
    weaknesses: ["认知速率过快，常对周遭的平庸产生隐秘傲慢与不耐烦，产生高维孤独。", "永远着眼于下一个目标，极难体会当下满足，大脑常处于超频过载状态。", "容错率极低的完美主义执念，一旦环节失控易引发暴躁焦虑。"],
    career: "高度适配企业高管层、战略咨询、创业操盘手。工作风格极具压迫感且高效。需绝对避开缺乏视野的微观管理环境或守成型组织。",
    romance: "典型的智性恋模式，寻求能在认知维度同频共振、共同推进宏图的合伙人式伴侣。雷区：将伴侣当做改造项目；过度依赖逻辑而忽视情感抚慰。",
    social: "沟通风格宏大、严密、直击要害。建议在日常交往中进行认知降维，增加非目标导向的闲聊比例；容忍他人瑕疵以减轻人际攻击性。",
    growth: "学习存在主义式的休息。允许在部分阶段切断与未来的连接，沉浸于纯粹的感官现实。接纳世界的不完美，软化坚硬的成就导向外壳。"
  },
  "ABAB": { 
    title: "智性盲盒", tags: "社交汲取 | 灵感畅想 | 理性通透 | 随性自在",
    shortDesc: "耀眼的“智性盲盒”，满脑子奇思妙想，做事全凭心情与理智交织。你讨厌被定义，常被误解为三分钟热度。其实你一直在等一个懂你的人。",
    core: "该类型具备极其敏捷的跳跃性思维与解构一切的反叛精神。内在动机在于探索未知、寻找智力刺激及体验思维碰撞。在人群中不断抛出新奇概念，以锐利理性解构世俗规范与情感操纵。拒绝被长远目标收编，活在思想持续更迭的当下，是人间游乐的骇客。",
    strengths: ["极高的跨界知识迁移能力，能迅速发觉异质事物的底层逻辑输出奇招。", "具备极强的批判性思维，任何洗脑话术与情感勒索均对其失效。", "擅长运用黑色幽默消解沉重与压力，为组织带来极高的心理松弛感。"],
    weaknesses: ["深层困境在于兴趣耗竭，执行深水区常因缺乏持续耐心而半途而废。", "过度理性解构一切，易陷入“什么都看透，却不知为何而活”的虚无感。", "缺乏深度长期的连接与承诺，导致精神上常有无法靠岸的漂泊感。"],
    career: "适配创意总监、品牌策划、危机公关、新媒体创作者。极度排斥强调打卡、流程控制的机械型组织，或官僚主义严重的保守机构。",
    romance: "需求充满新鲜感与智力挑战的非传统关系，看重精神独立。雷区：兴趣转移时的间歇性冷漠失踪；在伴侣寻求安慰时进行冷酷的逻辑辩论。",
    social: "沟通风格跳跃、机智、带思辨色彩。建议在他人表达脆弱时暂时关闭批判机制练习积极倾听；尝试履行极其微小的具体承诺建立信用。",
    growth: "进行深度执行力的逆向训练。选择一个核心兴趣，强迫自己度过无趣瓶颈期，体验将抽象理念转化为成熟实体的闭环。寻找逻辑外的微光信仰。"
  },
  "ABBA": { 
    title: "浪漫实干家", tags: "社交汲取 | 灵感畅想 | 共情柔软 | 规划有序",
    shortDesc: "用最浪漫的灵魂，过最自律的人生。你对世界充满善意，努力用计划把生活填满温暖。可过度燃烧自己照亮别人，真的不累吗？",
    core: "该类型兼具宏大的道德愿景与严谨的社会实践力。内在动机是促成人类福祉提升或实现理想主义蓝图。在社交中倾听他人痛点，依靠深厚同理心与想象力构建理想模型，随即通过极强的秩序感与执行计划，致力于将抽象的善意落实为具体的干预方案。",
    strengths: ["能够运用极具温度与深度的愿景描述，激发群体内在动机形成凝聚力。", "不落入空谈，能将道德诉求转化为可衡量、可执行的项目进度表。", "在施予深厚人文关怀的同时，能够维持系统的基本规则，不易被无度索取。"],
    weaknesses: ["极易遭遇道德耗竭，常将拯救他人的重担强加于身导致心智超载。", "当完美蓝图与现实的自私低效发生惨烈碰撞时，易产生极深幻灭感。", "自我要求苛刻的道德绑架，不允许自己有任何世俗的阴暗面或懈怠。"],
    career: "契合非营利组织领导、教育规划、企业社会责任（CSR）。需规避纯粹利益驱动、充满内部倾轧的商业红海环境，其冷酷特质会粉碎其价值观。",
    romance: "追求深度灵魂共鸣与共同成长，渴望具神圣感的联结。雷区：容易被带破碎感的对象吸引触发拯救者情结；对伴侣有道德洁癖易瞬间下头。",
    social: "沟通风格深情、有条理且富有启发性。建议放下教化与拯救欲，接纳他人平庸乃至堕落的自由；在倾听苦难时设立情绪防火墙避免替代性创伤。",
    growth: "练习宽恕现实的瑕疵。降低对人性及自身道德完美的严苛要求，允许自己在某些时刻呈现合理的自私。欣赏渐进改变过程中残缺的美。"
  },
  "ABBB": { 
    title: "捕风的旅人", tags: "社交汲取 | 灵感畅想 | 共情柔软 | 随性自在",
    shortDesc: "你是穿堂而过的自由风，感性浪漫、随遇而安。你在人群中散发迷人的松弛感，却也常因不切实际的幻想而碰壁。那个避风港究竟在哪？",
    core: "该类型展现为极其通透的感知力与彻底的非世俗取向。内在动机是追求纯粹审美体验、情感深度融合与灵魂绝对自由。完全向社会敞开感官，凭借高度发达的直觉与共情力与外界进行交互。抗拒一切机械规划与理性度量，以艺术化、体验式的姿态在人生中漫游。",
    strengths: ["敏锐捕捉世俗生活中被忽视的意象与波动，拥有极具爆发力的艺术天赋。", "其不带批判与功利色彩的倾听陪伴，能为创伤个体提供高浓度情感抚慰。", "凭借对生命的热爱与纯真的表达方式，轻易突破他人心理防线。"],
    weaknesses: ["核心危机在于现实适应不良，极度缺乏理智边界防御，易成为情感剥削目标。", "面对复杂的社会规则、繁琐的现实生活指标，常陷入逃避与瘫痪状态。", "过度共情使其背负他人苦难，环境轻微刺激易导致其陷入抑郁黑洞。"],
    career: "适配独立艺术创作、疗愈类干预、自由撰稿、体验测评。绝对规避任何以绩效为导向、强调KPI考核、或需处理复杂人际斗争的职场环境。",
    romance: "飞蛾扑火般的沉浸式爱恋，需求无缝的情感连接。雷区：极易在关系中丧失自我边界产生病态依恋；逃避现实问题期望伴侣全盘承担生活重压。",
    social: "沟通风格感性、跳跃、充满隐喻。建议在建立深度关系或承诺前设定强制性“理智冷却期”，并寻找具备现实批判能力的友人提供评估。",
    growth: "开展现实感触底训练。学习基础生存与财务技能，构建坚实的物质底盘支撑精神飞翔。深刻认识同情无法代替他人成长，节制情绪资本支出。"
  },
  "BAAA": { 
    title: "暗夜建筑师", tags: "独处蓄力 | 细节务实 | 理性通透 | 规划有序",
    shortDesc: "独处是顶级享受，秩序是最大安全感。你冷静高效地运转，却很久没有体会过奋不顾身的冲动了吧？你潜意识里渴望打破什么规则？",
    core: "该类型是极端自律与高度自治的系统构建者。内在动机源于对自我效能的极致追求及对外部世界混乱属性的防御。在深度独处中积聚心智资本，通过客观逻辑分析，制定出严谨且不容偏差的运行规则。他们是坚如磐石、不需要观众的“现实主义守夜人”。",
    strengths: ["具备非凡的深度工作能力（Deep Work），能长期忍受枯燥输出零瑕疵成果。", "在群体陷入恐慌时能瞬间剥离情绪，客观分析变量并执行止损策略。", "评价体系极度内化，不被外界毁誉动摇，无需依赖社会认同即可高效运转。"],
    weaknesses: ["对秩序病态追求，面临无法掌控的变量时会触发严酷的自我攻击焦虑。", "过度抑制感性体验，情绪常以躯体化或突然崩溃的形式破坏性爆发。", "过于僵硬死板的边界与冷漠外壳，使其难以建立具有深度的亲密支持系统。"],
    career: "极度契合后端开发、精算、科学研究、质量控制。工作风格冷酷严谨。需规避需高频情感劳动的公关销售岗及规则模糊的混乱管理体系。",
    romance: "需求高度独立、责任感强且边界清晰的伴侣，用实际行动保障关系。雷区：试图将情感生活纳入严苛绩效管理；面对伴侣诉求施以冷暴力。",
    social: "沟通风格精简、一针见血、缺乏润滑。建议刻意增加非功能性的寒暄与肯定性反馈，软化坚硬的表达外壳；尝试向信任的人适度暴露脆弱。",
    growth: "进行去结构化的心理脱敏训练。定期安排不设目标的空白期，接纳生活的失序感与毛边。认识到情绪并非需要消除的Bug而是重要的反馈单元。"
  },
  "BAAB": { 
    title: "通透隐士", tags: "独处蓄力 | 细节务实 | 理性通透 | 随性自在",
    shortDesc: "习惯冷眼旁观世间百态，不在乎世俗眼光，活得通透又佛系，实则是个隐形大佬。但偶尔也会瞬间觉得孤独吧？谁能强行闯进你的结界？",
    core: "该类型呈现出极其冷静的疏离感与极简主义倾向。内在动机在于最大化心理空间的自由度，避免卷入无谓内耗与世俗纷扰。在独处中保持敏锐抽离的观察，依赖精准逻辑处理现实，极具战术灵活性，但拒绝进行非必要心智投入，是低能量维持下的高效解题者。",
    strengths: ["顶级的心理钝感力，免受外界非理性情绪干扰，在复杂环境中明哲保身。", "面临具体现实困境时，能迅速剔除冗余信息，找到并执行最省力路径。", "在无压力自发状态下，对机器、技术或客观规律领域具极快上手天赋。"],
    weaknesses: ["习惯用冷酷理性剥离感性价值，缺乏长远牵引，易陷入行动瘫痪与犬儒主义。", "在外人看来极度冷血的防御机制，剥夺了深层情感连接带来的生命张力。", "缺乏主动推进大事件的激情，常错失人生机遇，陷入生活无意义感。"],
    career: "适配独立技术顾问、数据分析、危机干预特派员。工作风格任务导向、完成即抽身。绝对规避充斥着鸡血文化、强制社交的组织环境。",
    romance: "需求室友般低密度陪伴，看重物理与心理边界，反感黏腻。雷区：冲突时采用冷撤退或消失回避麻烦；日常缺乏主动性导致伴侣产生被忽视感。",
    social: "沟通风格客观直接但显漠不关心。建议社交回应中适度植入共情模拟（即使仅从认知层面理解），给予必要社会支持信号维持基础人际生态。",
    growth: "寻找一个值得深扎的现实羁绊。在特定小领域（如手工艺、编程甚至植物）建立长期责任关系。通过微小长期投入重建与世界的温热联结。"
  },
  "BABA": { 
    title: "深夜缝补者", tags: "独处蓄力 | 细节务实 | 共情柔软 | 规划有序",
    shortDesc: "你安静温和，内心有着极强秩序感与同理心。习惯默默扛下一切。可那些无人知晓的深夜暗流，是不是快把你淹没了？",
    core: "该类型是极具隐忍特质与高责任感的“静默支持者”。内在动机源于对他人需求的深层共情及维持环境秩序的执念。在独处中消化负面情绪，在群体中退居二线，细腻捕捉周遭痛点，通过高度条理化、默默无闻的执行力，维持整个系统的稳固与温情。",
    strengths: ["团队中最坚固的基石，能承担且完美消化极其繁琐枯燥的抚育或行政工作。", "擅长在细微处发现安全隐患或他人情绪创伤，提供极具安全感的周密防御。", "具备超乎常人抗压能力，对于认定关系与职责展现近乎信仰般的坚守。"],
    weaknesses: ["极度害怕冲突导致严重讨好倾向与边界丧失，未表达的委屈转化为内耗。", "长期不被关注与奖赏，容易在深夜陷入深度的自我怜悯与枯竭感中。", "过度念旧，背负沉重情感包袱前行，极难真正放下过去曾经受到的微小伤害。"],
    career: "适配档案管理、医疗护理、高端后台支持。工作风格严谨奉献。需规避需要极强侵略性、残酷末位淘汰或高频抛头露面的利益争夺环境。",
    romance: "典型的付出型伴侣，需求对方能够穿透沉默外表给予对等关怀。雷区：包办一切将伴侣培养为巨婴；遭遇不公时采用自虐式付出作为无声抗议。",
    social: "沟通风格温顺、多倾听少表达。建议开展合理主张权利的心理训练，使用直接平静语言陈述需求；将自己的付出可视化，消除隐形劳动。",
    growth: "必须建立自我优先级防御机制。允许部分任务失败或他人经历短暂不适，停止过度兜底行为。培养一项完全不涉及服务他人的纯粹个人爱好。"
  },
  "BABB": { 
    title: "静谧避风港", tags: "独处蓄力 | 细节务实 | 共情柔软 | 随性自在",
    shortDesc: "温柔的旁观者，心思细腻又随遇而安。你极易被小事治愈，也常因别人的不经意而暗自内耗。谁才是你命中注定的情感救赎者？",
    core: "该类型展现出高度的感知平和感与生活美学的自足。内在动机在于维持精神宁静与外界环境的非压迫性。倾向于在安全私密微观世界积蓄能量，以极度温和、无侵略性态度接纳事物发展，敏锐捕捉日常感官愉悦，追求顺应自然、与世无争的生活节律。",
    strengths: ["天然心理抚慰场，不带任何评判与压迫感，能轻易卸下他人防备成为倾听者。", "具备在平淡匮乏的现实中发掘微小幸福的能力，沉浸式生活审美极易满足。", "面临困境时倾向于通过极强心理退让与适应力化解压力，不易发生刚性断裂。"],
    weaknesses: ["极度厌恶冲突导致严重逃避心理与拖延症，在现实博弈中易沦为他人垫脚石。", "缺乏长期的成长锚点，常在舒适区丧失应对现实变局技能，引发潜在生存焦虑。", "不敢拒绝没有底线的老好人特质，常被迫承担他不情愿的琐事与压力。"],
    career: "适配图书管理、植物栽培、宠物护理、基础数据处理。绝对规避强KPI导向、需要激烈抗辩或处于风口浪尖的管理岗及前台业务岗。",
    romance: "需求极高安全感与现实庇护，渴望伴侣如同大树承担社会重压。雷区：彻底放弃自我成长与现实担当；面对裂痕时采取物理隔绝的鸵鸟策略。",
    social: "沟通风格轻柔顺从缺乏明确拒绝信号。建议进行攻击性整合，在安全环境中练习表达不满，认识到健康冲突不仅不毁灭关系反能确立真实边界。",
    growth: "建立微缩版长期责任系统。设定不可退让的、虽小但确定的目标边界（如一项必须掌握的生存技能）。学会在必要时展露锋芒守护自己的温柔。"
  },
  "BBAA": { 
    title: "孤独先知", tags: "独处蓄力 | 灵感畅想 | 理性通透 | 规划有序",
    shortDesc: "大脑是一座孤独城堡，装满宏伟构想。你习惯独自将梦想落地，不屑与平庸为伍。但太过独立让你很难开口求助，你的人生剧本还缺什么？",
    core: "该类型是深邃思想架构与冷酷逻辑演绎的完美结合体。内在动机是对宇宙真理及复杂系统本质的绝对洞悉。在极度隔绝的空间中吸收抽象概念，运用锋利理性解构，通过严密架构能力重组为能解释甚至预测未来的宏大理论或深层战略，享受高处不胜寒的孤独。",
    strengths: ["穿透现象迷雾的战略远见，能轻易掌握极其复杂、晦涩的系统底层逻辑。", "单人即可完成从宏大概念到严密逻辑链条的完整架构，无需依赖外部支持。", "具有极强且不可动摇的内在价值评估体系，对世俗庸常的诱惑免疫力极高。"],
    weaknesses: ["因认知维度过高，易对周遭环境产生难以掩饰的鄙夷与疏离，致人际断裂。", "内心对计划完美的苛刻追求，当现实变量侵扰时易引发强迫性拖延与认知焦虑。", "目光永远注视远方星辰大海，极度缺乏活在当下的世俗快乐与生命活力。"],
    career: "适配顶尖智库研究员、系统架构师、独立硬核创作者。极度排斥需频繁人际互动的情感劳动岗位，以及充满无意义行政琐事的反智组织环境。",
    romance: "需求极高智力匹配度与精神独立的伴侣，关系形同两座高塔间的量子纠缠。雷区：用纯粹逻辑推演碾压伴侣情感诉求；保持过度防御性心理距离。",
    social: "沟通风格极具思辨性、抽象缺乏温度。建议开展降维沟通练习，学习将深邃理念翻译为通俗语言；接纳情感非理性价值，允许他人平庸的合理性。",
    growth: "破除对绝对完美的执念。践行“先完成再完美”敏捷迭代原则，将部分理论抛入混沌现实检验。通过市井观察等接地气活动对冲过度抽象的虚无感。"
  },
  "BBAB": { 
    title: "精神流浪者", tags: "独处蓄力 | 灵感畅想 | 理性通透 | 随性自在",
    shortDesc: "活在精神宇宙里的迷人流浪者。脑洞大开又逻辑严密，做事全看心情。总觉得没人真正懂你。但你灵魂深处其实藏着一座巨大宝藏。",
    core: "该类型呈现为一种游离于系统之外的极致思辨与自由倾向。内在动机在于追求思想无边界遨游与摆脱教条束缚。在深度独处中产生颠覆性思想实验，凭借犀利理性拆解一切宏大叙事与虚伪包装，却拒绝将智慧锚定于任何世俗长期建构中，是精神荒野上的解构大师。",
    strengths: ["不受路径依赖局限，能在死局中提供出人意料且逻辑自洽的创新颠覆奇招。", "彻底免疫世俗成功学压迫，极少为名利与未来焦虑，拥有极致心理松弛感。", "具备洞悉人性与社会规律慧眼，辅以黑色幽默，是天生的思想探路者。"],
    weaknesses: ["深层困境在于严重执行力瘫痪，想法宇宙生灭千万次，现实中却拖延迟缓。", "过度理智解构导致万物皆空，缺乏现实联结牵引极易滑向深度存在主义虚无。", "在面对需长期坚持打磨的事物时习惯性放弃，导致才华横溢却常一事无成。"],
    career: "适配自由撰稿人、独立概念设计、特约前沿顾问。工作风格碎片化。必须避开所有包含严格考勤、繁冗流程审批与高度官僚化的传统企业。",
    romance: "需求极高容错率与绝对自由的非传统情感联结，看重智力层面新奇感。雷区：周期性冷漠断联拒绝承担世俗责任；过度理性嘲讽伴侣正常情感波动。",
    social: "沟通风格随性、跳跃夹杂犬儒主义讽刺。建议在他人分享世俗快乐悲伤时，克制解构冲动，提供最低限度情绪附和，维持社会化人格基本面。",
    growth: "构建现实锚点。强迫在微小具体领域建立长期执行承诺，作为抵御虚无压舱石。尝试高强度躯体运动关闭过载大脑皮层，重建心智与肉体链接。"
  },
  "BBBA": { 
    title: "深情小说家", tags: "独处蓄力 | 灵感畅想 | 共情柔软 | 规划有序",
    shortDesc: "内心戏超多。用浪漫想象描绘未来，又用严谨计划约束自己。外表安静，内心却是一片海啸。总是默默付出的你，何时才被温柔以待？",
    core: "该类型融合了汪洋般情感深度与极度内敛秩序外壳。内在动机在于将理想主义善意通过系统化形式转化为能触达他人的意义。在幽闭心智中体验剧烈共情风暴与浪漫想象，向外输出时却受强烈道德自律与秩序约束，呈现出戴着镣铐跳舞的深沉之美。",
    strengths: ["兼具悲悯心与结构化思维，极擅剖析幽微人性转化为震撼人心的思想成果。", "对认定的价值观、人际关系或长期目标拥有极强奉献精神与隐忍到底的毅力。", "能在理解极度非理性情感的同时，提供具备操作边界的系统干预与支撑。"],
    weaknesses: ["神经高度敏感压抑情绪直接表达，易陷入内心戏反刍与长期的精神自我审判。", "脑海构建完美剧本，当残酷现实与极高道德预期碰撞时，易引发信仰崩塌。", "懂事外壳下压抑自我需求，用秩序压抑悲伤最终化为刺向自身的刀刃。"],
    career: "适配深度内容创作者、心理干预专家、文化策展人。需规避需要圆滑世故、充满利益算计与零和博弈的商业一线，会引发极强道德排异反应。",
    romance: "纯爱信仰者，渴望灵魂独立前提下的深度精神互融。雷区：内心中演出完整悲欢离合却不吐露半分；对伴侣有神圣化期待，触及瑕疵便迅速退缩。",
    social: "沟通风格深沉含蓄字斟句酌。建议终止过度内心戏剧场，练习直球式的情感与需求确认。停止预设他人的完美，接纳周遭人际中合理的粗糙灰度。",
    growth: "寻找安全无序的情绪排污口。允许自己偏离既定道德计划轨道，进行适度非理性情感宣泄。降低自我牺牲的崇高化期待，承认并善待隐秘伤口。"
  },
  "BBBB": { 
    title: "游吟诗人", tags: "独处蓄力 | 灵感畅想 | 共情柔软 | 随性自在",
    shortDesc: "坠落凡间的游吟诗人，靠直觉和爱活着。你享受孤独，常沉浸在天马行空的幻想中。过度的理想主义常让你伤痕累累，谁来为你遮风挡雨？",
    core: "该类型是彻底脱离世俗引力的纯粹感知者。内在动机在于体验生命最本真情感流动与美学启示。完全摒弃现实防御机制与理性筹谋，在独处幻想中构建精神避难所，依靠极度发达直觉与无边界共情力与世界发生弱连接，是现实秩序的反叛者和易碎精灵。",
    strengths: ["未受世俗逻辑污染，对色彩音符或不可言喻情感拥有直击灵魂的创造共鸣天赋。", "其不带功利心与防御性的温柔，能为遭受重创个体提供母体般的心理安抚。", "能够轻易跨越阶层与物种，对世间的苦难产生深切且无私的悲悯共振。"],
    weaknesses: ["严重现实生存无能，缺乏理性规划边界，处理基础财务等问题陷入瘫痪恐慌。", "过度泛滥的同情心且不设防，使其极易成为暗黑三合一人格的被剥削猎物。", "对环境轻微刺激极度敏感，现实的冷漠粗暴容易引发其情绪动荡陷入抑郁。"],
    career: "适配独立音乐人、插画师、非临床治愈师。完全受情绪周期主导。绝对规避任何包含阶级压迫、KPI考核及复杂人际内耗的现代企业职场。",
    romance: "献祭式爱恋，极度需求精神交融且现实中提供绝对安全庇护的灵魂伴侣。雷区：彻底融化自我边界引发窒息依恋；将伴侣理想化拒绝承担生存责任。",
    social: "沟通风格感性梦幻缺乏逻辑。建议强制保留一位极度务实理性的护航者朋友，在做出任何重大的情感托付或财务决定前，引入第三方理智阻断机制。",
    growth: "迫切需要泥土扎根训练。节制过度泛滥同理心，明白各人皆有自身因果。每天强迫完成一项枯燥世俗事务（如记账）作为增强心理韧性的基石。"
  }
};

export default function App() {
  const [step, setStep] = useState(0); 
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null));
  const [resultCode, setResultCode] = useState("");
  const [showModal, setShowModal] = useState(false); // 控制支付弹窗

  // 监听回到顶部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step, currentQ]);

  // 处理选项选择（支持自动跳转）
  const handleSelectOption = (choice) => {
    const newAnswers = [...answers];
    newAnswers[currentQ] = choice;
    setAnswers(newAnswers);

    // 选中后延迟 300ms 自动跳转下一题
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
      } else {
        // 如果是最后一题，选完不直接计算，让用户手动点提交，或者这里直接计算也行。
        // 这里设定为：最后一题选完也自动出结果
        calculateResult(newAnswers);
      }
    }, 300);
  };

  // 手动下一题
  const handleNext = () => {
    if (!answers[currentQ]) return;
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      calculateResult(answers);
    }
  };

  // 手动上一题
  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
    }
  };

  // 计算结果
  const calculateResult = (finalAnswers) => {
    setStep(2); // Loading
    
    const dim1 = finalAnswers.slice(0, 12);
    const dim2 = finalAnswers.slice(12, 24);
    const dim3 = finalAnswers.slice(24, 36);
    const dim4 = finalAnswers.slice(36, 48);

    const countA = (arr) => arr.filter(ans => ans === 'A').length;

    const c1 = countA(dim1) >= 6 ? 'A' : 'B';
    const c2 = countA(dim2) >= 6 ? 'A' : 'B';
    const c3 = countA(dim3) >= 6 ? 'A' : 'B';
    const c4 = countA(dim4) >= 6 ? 'A' : 'B';

    setResultCode(`${c1}${c2}${c3}${c4}`);

    // Loading 2秒后进入 简要引流结果页 (step 3)
    setTimeout(() => {
      setStep(3); 
    }, 2000);
  };

  // 模拟支付成功，跳转完整报告页
  const handlePaymentSuccess = () => {
    setShowModal(false);
    setStep(4); // 跳转到详细专业报告
  };

  // ---------------- UI 渲染 ---------------- //

  // Step 0: 首屏
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-6 relative max-w-md mx-auto shadow-xl overflow-hidden">
        <div className="absolute top-10 w-28 h-28 bg-blue-200 rounded-full blur-2xl opacity-70"></div>
        <div className="absolute bottom-20 right-10 w-36 h-36 bg-purple-200 rounded-full blur-3xl opacity-60"></div>
        
        <div className="z-10 text-center w-full mt-10">
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-4 py-1.5 rounded-full mb-6 inline-block">全网爆火测评 🔥</span>
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900 leading-tight">
            青年生存图鉴<br/>
            <span className="text-2xl mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">16型深度人格解码</span>
          </h1>
          <p className="text-gray-500 mb-12 text-sm px-6 leading-relaxed">
            摒弃枯燥理论，用48个真实的日常小剧场，精准测写你在这个世界最真实的生存姿态与隐藏性格。
          </p>
          
          <button 
            onClick={() => setStep(1)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all active:scale-95"
          >
            马上开始测试 🚀
          </button>
          <div className="mt-5 text-gray-400 text-xs tracking-wider">
            已有 284,192 人参与 · 测试约需3分钟
          </div>
        </div>
        
        <div className="absolute bottom-6 w-full text-center text-gray-400 text-xs px-8">
          【仅供娱乐参考，非专业心理诊断】
        </div>
      </div>
    );
  }

  // Step 1: 答题页
  if (step === 1) {
    const qData = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;
    const isAnswered = answers[currentQ] !== null;

    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col p-6 max-w-md mx-auto shadow-xl relative">
        {/* 顶部进度条 */}
        <div className="w-full mt-4 mb-8">
          <div className="flex justify-between text-xs text-gray-500 mb-2 font-medium">
            <span>探索进度</span>
            <span>{currentQ + 1} / {questions.length}</span>
          </div>
          <div className="w-full bg-gray-200 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full transition-all duration-300 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 题目区域 */}
        <div className="flex-1 flex flex-col justify-center animate-fadeIn pb-10">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8 relative">
             <div className="absolute -top-4 -left-2 text-6xl text-blue-100 font-serif opacity-50">"</div>
            <h2 className="text-xl font-bold leading-relaxed relative z-10 text-gray-800">
              {qData.q}
            </h2>
          </div>

          {/* 选项按钮 */}
          <div className="space-y-4">
            <button 
              onClick={() => handleSelectOption('A')}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all active:scale-95 text-base font-medium ${
                answers[currentQ] === 'A' 
                ? 'border-blue-400 bg-blue-50 text-blue-800 shadow-md' 
                : 'border-transparent bg-white text-gray-700 shadow-sm hover:border-blue-200'
              }`}
            >
              <span className={`mr-3 font-bold ${answers[currentQ] === 'A' ? 'text-blue-600' : 'text-gray-400'}`}>A.</span> {qData.a}
            </button>
            <button 
              onClick={() => handleSelectOption('B')}
              className={`w-full text-left p-5 rounded-2xl border-2 transition-all active:scale-95 text-base font-medium ${
                answers[currentQ] === 'B' 
                ? 'border-purple-400 bg-purple-50 text-purple-800 shadow-md' 
                : 'border-transparent bg-white text-gray-700 shadow-sm hover:border-purple-200'
              }`}
            >
              <span className={`mr-3 font-bold ${answers[currentQ] === 'B' ? 'text-purple-600' : 'text-gray-400'}`}>B.</span> {qData.b}
            </button>
          </div>
          <div className="text-center mt-6 text-xs text-gray-400 animate-pulse">
            👆 选完自动跳下一题
          </div>
        </div>

        {/* 底部手动翻页按钮 */}
        <div className="mt-auto pt-4 flex gap-4 border-t border-gray-100">
          <button 
            onClick={handlePrev}
            disabled={currentQ === 0}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
              currentQ === 0 
              ? 'bg-gray-100 text-gray-300 cursor-not-allowed' 
              : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            上一题
          </button>
          <button 
            onClick={handleNext}
            disabled={!isAnswered}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all shadow-sm ${
              !isAnswered
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-md'
            }`}
          >
            {currentQ === questions.length - 1 ? '提交查看' : '下一题'}
          </button>
        </div>
      </div>
    );
  }

  // Step 2: 加载页
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center max-w-md mx-auto shadow-xl">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 animate-pulse">灵魂解码中...</h2>
        <p className="text-gray-500 text-sm">正在深度匹配16型人格图谱</p>
      </div>
    );
  }

  // Step 3: 简版报告页 (带付费弹窗逻辑)
  if (step === 3) {
    const result = resultData[resultCode] || resultData["AAAA"]; 

    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col max-w-md mx-auto shadow-xl pb-10 relative">
        
        {/* 支付模拟弹窗 Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl animate-fadeIn">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-2">解锁 3000 字详细报告</h3>
              <p className="text-gray-500 text-sm mb-6 px-2">
                这里是模拟支付流程。在实际部署中，将唤起微信支付 6.9 元。支付成功后，即可查看包含8大专业维度的超详细解析。
              </p>
              <div className="space-y-3">
                <button 
                  onClick={handlePaymentSuccess}
                  className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  模拟支付成功，查看报告
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                >
                  暂不解锁
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 头部装饰 */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 pt-12 pb-16 rounded-b-[40px] relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-xl"></div>
          <div className="text-center relative z-10">
            <p className="text-gray-400 text-sm mb-2 tracking-widest uppercase">你的灵魂底色是</p>
            <h1 className="text-4xl font-extrabold mb-4">{result.title}</h1>
            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">
              {result.tags}
            </div>
          </div>
        </div>

        {/* 引流内容卡片 */}
        <div className="px-5 -mt-8 relative z-20">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
            <h3 className="flex items-center text-lg font-bold mb-4 text-gray-800">
              <span className="w-1.5 h-5 bg-blue-500 rounded-full mr-2"></span>
              核心画像速览
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {result.shortDesc}
            </p>
            
            <div className="mt-6 p-5 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-blue-900 mb-3 text-sm flex items-center">
                <span className="mr-2 text-lg">🔒</span> 解锁完整深度报告获取：
              </h4>
              <ul className="text-sm text-gray-700 space-y-2.5 ml-1">
                <li className="flex items-center"><span className="text-blue-500 mr-2">●</span> 你的天生优势与降维打击能力</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">●</span> 隐藏的内耗根源与性格短板</li>
                <li className="flex items-center"><span className="text-blue-500 mr-2">●</span> 职场天命圈与避雷指南</li>
                <li className="flex items-center"><span className="text-purple-500 mr-2">●</span> 恋爱相处模式与灵魂伴侣画像</li>
                <li className="flex items-center"><span className="text-blue-500 mr-2">●</span> 专属人际沟通技巧与进阶建议</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 付费按钮 */}
        <div className="px-5 mt-8 mb-4">
          <button 
            onClick={() => setShowModal(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center animate-bounce"
            style={{ animationDuration: '2s' }}
          >
            生成详细报告 📄
          </button>
        </div>

        <div className="text-center text-gray-400 text-xs px-8 mt-auto pt-6">
          【免责声明：本测评仅供娱乐与自我参考，不构成专业心理诊断、医疗建议或诊疗依据。】
        </div>
      </div>
    );
  }

  // Step 4: 完整详细报告页 (用户付费后可见)
  if (step === 4) {
    const result = resultData[resultCode] || resultData["AAAA"]; 

    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col max-w-md mx-auto shadow-xl font-sans pb-4">
        
        {/* 头部装饰 */}
        <div className="bg-gradient-to-br from-blue-900 to-purple-900 text-white p-8 pt-12 pb-12 relative overflow-hidden shadow-md">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="text-center relative z-10">
            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full mb-3 inline-block">完整版解码报告 🔓</span>
            <h1 className="text-3xl font-extrabold mb-3 tracking-wide">{result.title}</h1>
            <p className="text-blue-200 text-sm font-medium">{result.tags}</p>
          </div>
        </div>

        {/* 报告主体内容 */}
        <div className="px-5 -mt-6 relative z-20 space-y-5">
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-1.5 h-4 bg-blue-600 rounded-full mr-2"></div>
              <h3 className="text-base font-bold text-gray-800">核心人格画像</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed text-justify">
              {result.core}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-1.5 h-4 bg-green-500 rounded-full mr-2"></div>
              <h3 className="text-base font-bold text-gray-800">优势与天赋特质</h3>
            </div>
            <ul className="space-y-3">
              {result.strengths.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-600 leading-relaxed text-justify">
                  <span className="text-green-500 mr-2 mt-0.5">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center mb-4">
              <div className="w-1.5 h-4 bg-red-500 rounded-full mr-2"></div>
              <h3 className="text-base font-bold text-gray-800">潜在短板与内耗</h3>
            </div>
            <ul className="space-y-3">
              {result.weaknesses.map((item, idx) => (
                <li key={idx} className="flex items-start text-sm text-gray-600 leading-relaxed text-justify">
                  <span className="text-red-500 mr-2 mt-0.5">⚠️</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex items-center mb-4">
              <div className="w-1.5 h-4 bg-indigo-500 rounded-full mr-2"></div>
              <h3 className="text-base font-bold text-gray-800">职场发展指南</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed text-justify">
              {result.career}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex items-center mb-4">
              <div className="w-1.5 h-4 bg-pink-500 rounded-full mr-2"></div>
              <h3 className="text-base font-bold text-gray-800">亲密关系模式</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed text-justify">
              {result.romance}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
             <div className="flex items-center mb-4">
              <div className="w-1.5 h-4 bg-amber-500 rounded-full mr-2"></div>
              <h3 className="text-base font-bold text-gray-800">社交沟通建议</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed text-justify">
              {result.social}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-md mt-4">
            <div className="flex items-center mb-4">
              <div className="w-1.5 h-4 bg-white rounded-full mr-2"></div>
              <h3 className="text-base font-bold text-white">进阶成长方向</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed text-justify">
              {result.growth}
            </p>
          </div>
        </div>

        {/* 重新测试按钮 */}
        <div className="px-5 mt-10">
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 rounded-xl bg-white text-gray-800 font-bold text-sm border border-gray-200 shadow-sm hover:bg-gray-50 transition-all active:scale-95"
          >
            返回首页重新测评
          </button>
        </div>

        {/* 固定免责声明 */}
        <div className="mt-12 mb-6 px-6">
          <p className="text-center text-gray-400 text-xs leading-relaxed">
            【免责声明：本测评仅供娱乐与自我参考，不构成专业心理诊断、医疗建议或诊疗依据。】
          </p>
        </div>
      </div>
    );
  }

  return null;
}
