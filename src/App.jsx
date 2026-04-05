import React, { useState, useEffect } from 'react';

// --- 题库数据 (48题, 每12题为一个维度) ---
const questions = [
  // 维度1：能量获取 (1-12题) A:社交汲取 B:独处蓄力
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
  
  // 维度2：认知模式 (13-24题) A:细节务实 B:灵感畅想
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

  // 维度3：处事风格 (25-36题) A:理性通透 B:共情柔软
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

  // 维度4：生活节奏 (37-48题) A:规划有序 B:随性自在
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

// --- 结果文案库 (16种组合) ---
const resultData = {
  "AAAA": { title: "清醒领航者", tags: "社交汲取 | 细节务实 | 理性通透 | 规划有序", desc: "在人群中掌控全局的你，凡事讲逻辑与规划。别人以为你无坚不摧，但夜深疲惫时，计划表背后的脆弱谁来懂？想知道谁能一眼看穿你的逞强？" },
  "AAAB": { title: "游刃有余的玩家", tags: "社交汲取 | 细节务实 | 理性通透 | 随性自在", desc: "热闹是你，清醒也是你。你在人群中捕捉细节，却从不给自己设限。看似随性游走，实则心里门儿清。但过于理智的松弛，会不会让你错过真心？" },
  "AABA": { title: "治愈系大管家", tags: "社交汲取 | 细节务实 | 共情柔软 | 规划有序", desc: "你是大家眼里靠谱的小太阳，总能有条不紊照顾所有人的情绪。可你为迎合期待而咽下的委屈，谁来倾听？你性格深处隐藏着一个反转能量。" },
  "AABB": { title: "人间小太阳", tags: "社交汲取 | 细节务实 | 共情柔软 | 随性自在", desc: "穿梭在人群中的快乐小狗！你敏锐捕捉善意，凭直觉享受当下的热烈。但太容易共情，常让你在深夜陷入莫名内耗吧？你的专属解药正在生成。" },
  "ABAA": { title: "高维造梦师", tags: "社交汲取 | 灵感畅想 | 理性通透 | 规划有序", desc: "你是自带光芒的造梦者，用天马行空的灵感和严密规划，把不可能变现实。别人惊叹你的高效，你却深知高处不胜寒。你的下一次人生转折点藏在哪里？" },
  "ABAB": { title: "智性盲盒", tags: "社交汲取 | 灵感畅想 | 理性通透 | 随性自在", desc: "人群中最耀眼的“智性盲盒”，满脑子奇思妙想，做事全凭心情与理智交织。你讨厌被定义，常被误解为三分钟热度。其实你一直在等一个懂你奇奇怪怪的人。" },
  "ABBA": { title: "浪漫实干家", tags: "社交汲取 | 灵感畅想 | 共情柔软 | 规划有序", desc: "用最浪漫的灵魂，过最自律的人生。你对世界充满善意，努力用计划把生活填满温暖。可过度燃烧自己照亮别人，真的不累吗？你心里有一把未开启的钥匙。" },
  "ABBB": { title: "捕风的旅人", tags: "社交汲取 | 灵感畅想 | 共情柔软 | 随性自在", desc: "你是穿堂而过的自由风，感性浪漫、随遇而安。你在人群中散发迷人的松弛感，却也常因不切实际的幻想而碰壁。那个能让你安心降落的避风港究竟在哪？" },
  "BAAA": { title: "暗夜建筑师", tags: "独处蓄力 | 细节务实 | 理性通透 | 规划有序", desc: "独处是你的顶级享受，秩序是你最大的安全感。你冷静高效地运转，却很久没有体会过奋不顾身的冲动了吧？你潜意识里一直在渴望打破某种规则。" },
  "BAAB": { title: "通透隐士", tags: "独处蓄力 | 细节务实 | 理性通透 | 随性自在", desc: "你享受清净，习惯冷眼旁观世间百态。不在乎世俗眼光，活得通透又佛系，实则是个隐形大佬。但偶尔也会有一瞬间觉得孤独吧？你的结界正被谁敲打？" },
  "BABA": { title: "深夜缝补者", tags: "独处蓄力 | 细节务实 | 共情柔软 | 规划有序", desc: "你安静温和，内心有着极强秩序感与同理心。习惯默默扛下一切，把生活打理得井井有条。可那些无人知晓的深夜暗流，是不是快把你淹没了？" },
  "BABB": { title: "静谧避风港", tags: "独处蓄力 | 细节务实 | 共情柔软 | 随性自在", desc: "温柔的旁观者，心思细腻又随遇而安。你极易被小事治愈，也常因别人的不经意而暗自内耗。在自己的小世界里，谁才是你命中注定的情感救赎者？" },
  "BBAA": { title: "孤独先知", tags: "独处蓄力 | 灵感畅想 | 理性通透 | 规划有序", desc: "你的大脑是一座孤独城堡，装满宏伟构想与严密推演。你习惯独自将梦想落地，不屑与平庸为伍。但太过独立让你很难开口求助。你的人生剧本里藏着惊喜。" },
  "BBAB": { title: "精神流浪者", tags: "独处蓄力 | 灵感畅想 | 理性通透 | 随性自在", desc: "活在自己精神宇宙里的迷人流浪者。脑洞大开又逻辑严密，做事全看心情。总觉得没人真正懂你，干脆懒得解释。但你灵魂深处其实藏着一座巨大宝藏。" },
  "BBBA": { title: "深情小说家", tags: "独处蓄力 | 灵感畅想 | 共情柔软 | 规划有序", desc: "内心戏超多的深情小说家。用最浪漫的想象描绘未来，又用最严谨的计划约束自己。外表安静，内心却是一片海啸。总是默默付出的你，何时才被温柔以待？" },
  "BBBB": { title: "游吟诗人", tags: "独处蓄力 | 灵感畅想 | 共情柔软 | 随性自在", desc: "坠落凡间的游吟诗人，靠直觉和爱活着。你享受孤独，常沉浸在天马行空的幻想中。但过度的理想主义，常让你在现实中伤痕累累。谁来为你遮风挡雨？" }
};

export default function App() {
  const [step, setStep] = useState(0); // 0:Home, 1:Quiz, 2:Loading, 3:Result
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [resultCode, setResultCode] = useState("");
  const [showModal, setShowModal] = useState(false);

  // 处理答题点击
  const handleAnswer = (choice) => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    
    if (currentQ < questions.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  // 计算最终结果
  const calculateResult = (finalAnswers) => {
    setStep(2); // 进入加载页
    
    // 分割4个维度，每12题为一个维度
    const dim1 = finalAnswers.slice(0, 12);
    const dim2 = finalAnswers.slice(12, 24);
    const dim3 = finalAnswers.slice(24, 36);
    const dim4 = finalAnswers.slice(36, 48);

    // 统计各维度选A的数量
    const countA = (arr) => arr.filter(ans => ans === 'A').length;

    // A多数则为A特质，否则为B特质
    const c1 = countA(dim1) >= 6 ? 'A' : 'B';
    const c2 = countA(dim2) >= 6 ? 'A' : 'B';
    const c3 = countA(dim3) >= 6 ? 'A' : 'B';
    const c4 = countA(dim4) >= 6 ? 'A' : 'B';

    const code = `${c1}${c2}${c3}${c4}`;
    setResultCode(code);

    // 模拟数据生成等待感，提升转化心理预期
    setTimeout(() => {
      setStep(3);
    }, 2500);
  };

  // 渲染首屏
  if (step === 0) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center p-6 relative max-w-md mx-auto shadow-xl">
        <div className="absolute top-10 w-24 h-24 bg-blue-100 rounded-full blur-2xl opacity-70"></div>
        <div className="absolute bottom-20 w-32 h-32 bg-purple-100 rounded-full blur-3xl opacity-60"></div>
        
        <div className="z-10 text-center w-full mt-10">
          <span className="bg-blue-100 text-blue-600 text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block">全网爆火🔥</span>
          <h1 className="text-4xl font-extrabold mb-4 text-gray-900 leading-tight">青年生存图鉴<br/><span className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">灵魂深度测试</span></h1>
          <p className="text-gray-500 mb-10 text-sm px-4">不提MBTI，不说专业术语。用48个真实的日常小剧场，测出你在这个世界最真实的生存姿态。全程约需3分钟。</p>
          
          <button 
            onClick={() => setStep(1)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all active:scale-95"
          >
            马上开始测试 🚀
          </button>
          <div className="mt-6 text-gray-400 text-xs">已有 284,192 人参与测试</div>
        </div>

        <div className="absolute bottom-6 w-full text-center text-gray-400 text-xs px-8">
          【仅供娱乐参考，非专业心理诊断】
        </div>
      </div>
    );
  }

  // 渲染测试页
  if (step === 1) {
    const qData = questions[currentQ];
    const progress = ((currentQ + 1) / questions.length) * 100;

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
        <div className="flex-1 flex flex-col justify-center animate-fadeIn pb-20">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 mb-8 relative">
             <div className="absolute -top-4 -left-2 text-6xl text-blue-100 font-serif opacity-50">"</div>
            <h2 className="text-xl font-bold leading-relaxed relative z-10 text-gray-800">
              {qData.q}
            </h2>
          </div>

          {/* 选项按钮 */}
          <div className="space-y-4">
            <button 
              onClick={() => handleAnswer('A')}
              className="w-full text-left p-5 rounded-2xl bg-white border-2 border-transparent shadow-sm hover:border-blue-400 hover:shadow-md transition-all active:scale-95 active:bg-blue-50 text-base font-medium text-gray-700"
            >
              <span className="mr-3 font-bold text-blue-500">A.</span> {qData.a}
            </button>
            <button 
              onClick={() => handleAnswer('B')}
              className="w-full text-left p-5 rounded-2xl bg-white border-2 border-transparent shadow-sm hover:border-purple-400 hover:shadow-md transition-all active:scale-95 active:bg-purple-50 text-base font-medium text-gray-700"
            >
              <span className="mr-3 font-bold text-purple-500">B.</span> {qData.b}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 渲染加载页 (假装在深度计算)
  if (step === 2) {
    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center justify-center max-w-md mx-auto shadow-xl">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2 animate-pulse">正在生成你的灵魂解码...</h2>
        <p className="text-gray-500 text-sm">正在匹配16种人格模型与隐藏特质</p>
      </div>
    );
  }

  // 渲染结果页
  if (step === 3) {
    const result = resultData[resultCode] || resultData["AAAA"]; // Fallback

    return (
      <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col max-w-md mx-auto shadow-xl pb-10">
        {/* 支付模拟弹窗 */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl transform scale-100 transition-transform">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-2">解锁深度报告</h3>
              <p className="text-gray-500 text-sm mb-6">在实际部署的H5环境中，点击此处将唤起微信/支付宝支付 6.9元，支付成功后展示完整的3000字深度报告页面。</p>
              <button 
                onClick={() => setShowModal(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-bold hover:bg-gray-200"
              >
                我知道了，关闭弹窗
              </button>
            </div>
          </div>
        )}

        {/* 头部装饰 */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8 pt-12 pb-16 rounded-b-[40px] relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
          <div className="text-center relative z-10">
            <p className="text-gray-400 text-sm mb-2 tracking-widest uppercase">你的灵魂底色是</p>
            <h1 className="text-4xl font-extrabold mb-4">{result.title}</h1>
            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium border border-white/10">
              {result.tags}
            </div>
          </div>
        </div>

        {/* 内容卡片 */}
        <div className="px-5 -mt-8 relative z-20">
          <div className="bg-white rounded-3xl p-6 shadow-md border border-gray-100">
            <h3 className="flex items-center text-lg font-bold mb-4 text-gray-800">
              <span className="w-1 h-5 bg-blue-500 rounded-full mr-2"></span>
              核心画像预览
            </h3>
            <p className="text-gray-600 leading-relaxed text-base">
              {result.desc}
            </p>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-100">
              <h4 className="font-bold text-blue-800 mb-2 text-sm flex items-center">
                <span className="mr-1">🔒</span> 完整报告包含以下解锁内容：
              </h4>
              <ul className="text-sm text-blue-700 space-y-2 ml-1">
                <li>✨ 你的天生优势与降维打击能力</li>
                <li>💔 隐藏的内耗根源与性格短板</li>
                <li>💼 职场适配“天命圈”与避雷指南</li>
                <li>💘 恋爱相处模式与灵魂伴侣画像</li>
                <li>🔑 专属人际交往技巧与自我成长建议</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 底部按钮区域 */}
        <div className="px-5 mt-8 mb-6">
          <button 
            onClick={() => setShowModal(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center"
          >
            支付 6.9元 解锁完整报告 🔓
          </button>
          
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 mt-4 rounded-2xl bg-white text-gray-600 font-bold text-base border border-gray-200 hover:bg-gray-50 transition-all"
          >
            重新测试
          </button>
        </div>

        <div className="text-center text-gray-400 text-xs px-8 mt-auto">
          【仅供娱乐参考，非专业心理诊断】<br/>
          Copyright © 青年生存图鉴
        </div>
      </div>
    );
  }

  return null;
}
