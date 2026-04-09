import { useState, useRef, useEffect, useCallback } from "react";

const T = {
  brand:{zh:"撕了么",en:"RIP IT"},
  tagline:{zh:"终结内耗 · 英文职场大杀四方",en:"Stop Holding Back. Start Winning."},
  mantra:{zh:"今天的撕，是为了终有一天不撕。",en:"We practice the fight, so one day we won't need to."},
  enterName:{zh:"你的昵称是…",en:"Your nickname is…"},
  namePlaceholder:{zh:"输入你的昵称",en:"Enter your nickname"},
  nameBtn:{zh:"开始撕 →",en:"Let's Go →"},
  nameHint:{zh:"我们会用你的名字跟你说话",en:"We'll use it to talk directly to you"},
  why1:{zh:"不是背话术，是真实压力下的反应训练",en:"Not memorizing scripts — real-time pressure training"},
  why2:{zh:"四种AI对手，沉浸式场景，极强代入感",en:"4 AI opponents, immersive scenes, real pressure"},
  why3:{zh:"智能评测复盘，生成专属东西方智慧金句卡",en:"Smart debrief with your own Eastern & Western wisdom card"},
  firstTime:{zh:"第一次来？先试试Dave — 冷静权威型",en:"First time? Start with Dave — The Ice Executive"},
  selectScene:{zh:"选择场景",en:"Choose Your Scene"},
  customScene:{zh:"✦ 自定义场景",en:"✦ Custom Scene"},
  customSceneDesc:{zh:"有自己想练的真实情境？",en:"Have a real situation to practice?"},
  customSceneTitle:{zh:"描述你的战场",en:"Describe Your Situation"},
  customPlaceholder:{zh:"比如：明天要跟美国VP汇报Q3数据，他上次当众质疑过我的方法论……",en:"e.g. Tomorrow I need to present Q3 data to our VP who publicly challenged my methodology last time…"},
  customBtn:{zh:"用这个场景开练 →",en:"Practice This Scene →"},
  selectOpponent:{zh:"选择对手",en:"Choose Your Opponent"},
  selectDifficulty:{zh:"选择难度",en:"Set Difficulty"},
  viewCard:{zh:"查看任务卡 →",en:"View Mission Card →"},
  startNow:{zh:"开始对练 →",en:"Start Practice →"},
  missionCardTitle:{zh:"任务卡",en:"Mission Card"},
  missionRole:{zh:"你是",en:"You Are"},
  missionWhat:{zh:"发生了什么",en:"What Happened"},
  missionGoals:{zh:"今天要做到",en:"Your Goals Today"},
  missionPhrases:{zh:"场景话术",en:"Key Phrases"},
  cardBtn:{zh:"📋 任务卡",en:"📋 Card"},
  hint:{zh:"话术",en:"Phrases"},
  hideHint:{zh:"收起",en:"Hide"},
  end:{zh:"结束",en:"End"},
  debrief:{zh:"复盘",en:"Debrief"},
  keyMoves:{zh:"三个关键动作",en:"3 Key Moves"},
  bookInsight:{zh:"今天你的智慧金句",en:"Today's Wisdom"},
  analyzing:{zh:"正在分析你的表现…",en:"Analyzing your session…"},
  again:{zh:"再撕一次 →",en:"Go Again →"},
  changeDiff:{zh:"换难度",en:"Change Difficulty"},
  newScene:{zh:"换场景",en:"New Scene"},
  next_strong:{zh:"咱在这块已经有感觉了。去读懂对方试试——完全不同的挑战。",en:"You've got this down. Try Empathy Others — a completely different challenge."},
  next_solid:{zh:"同一个场景，咱换个不同的对手试试——每个人施压的方式完全不一样。",en:"Same scene, different opponent — each one pressures you in a completely different way."},
  next_developing:{zh:"换个不同的场景感受一下，找到自己的节奏，再回来挑战这个。",en:"Try a different scene to find your rhythm, then come back to this one."},
  listening:{zh:"松开发送",en:"Release to send"},
  speakingOpp:{zh:"对手正在说话…",en:"Opponent speaking…"},
  thinking:{zh:"对手正在思考…",en:"Thinking…"},
  prompt:{zh:"按住麦克风，用英文开口",en:"Hold mic · speak English"},
  interrupt:{zh:"打断",en:"Interrupt"},
  easy:{zh:"好说话",en:"Easy"},
  medium:{zh:"有压力",en:"Medium"},
  hard:{zh:"很强硬",en:"Hard"},
  chromeNote:{zh:"请用 Chrome 以支持语音",en:"Use Chrome for voice support"},
  micError:{zh:"请允许麦克风权限",en:"Please allow microphone access"},
  netError:{zh:"网络错误，请重试",en:"Network error, please retry"},
  back:{zh:"← 返回",en:"← Back"},
  cat1:{zh:"自我内核",en:"Self-Alignment"},
  cat2:{zh:"读懂对方",en:"Empathy Others"},
  cat3:{zh:"掌控场域",en:"Vibe Master"},
  catDesc1:{zh:"边界、立场、内在力量",en:"Boundaries, conviction, clarity"},
  catDesc2:{zh:"倾听、读人、建立信任",en:"Empathy, listening, trust"},
  catDesc3:{zh:"主导节奏、控制叙事",en:"Own the room, control the narrative"},
  noOpp:{zh:"请先选择一个对手",en:"Please select an opponent"},
  paywallTitle:{zh:"你的免费体验已用完",en:"Your free sessions are up"},
  paywallSub:{zh:"三个月，把职场英文说话的底气练出来",en:"3 months. Build the confidence to speak up at work."},
  paywallPrice:{zh:"¥49 · 三个月无限对练",en:"¥49 · 3 Months Unlimited Practice"},
  paywallContact:{zh:"付款后请联系小红书 @解忧Ka 开通服务",en:"After payment, DM @解忧Ka on Xiaohongshu to activate"},
  paywallCommunity:{zh:"开通后即可加入撕了么英文职场精进社群，更多独家资料和福利等你来拿",en:"Join our English workplace practice community after activation — exclusive resources and more await"},
  screenshotTitle:{zh:"人生场景变幻万千 永存惟有智慧",en:"The battle fades. The wisdom stays."},
  screenshotHint:{zh:"本记录不会保存 请截图留下你的专属智慧金句",en:"Screenshot to keep your wisdom card 📱"},
  feedbackBtn:{zh:"💬 反馈",en:"💬 Feedback"},
  feedbackTitle:{zh:"告诉我你的想法",en:"Share Your Thoughts"},
  feedbackPlaceholder:{zh:"功能建议、bug、或者你的练习故事……",en:"Feature ideas, bugs, or your practice story…"},
  feedbackSend:{zh:"发送",en:"Send"},
  feedbackThanks:{zh:"收到了，谢谢你 🙏",en:"Got it, thank you 🙏"},
};
const t=(k,l)=>T[k]?.[l]??T[k]?.zh??k;
const BUILD_MARKER="local-build-2026-04-10-v3";

const BOOKS=[
  {id:"culture_map",title:"The Culture Map",author:"Erin Meyer"},
  {id:"think_faster",title:"Think Faster, Talk Smarter",author:"Matt Abrahams"},
  {id:"crucial",title:"Crucial Conversations",author:"Patterson et al."},
  {id:"never_split",title:"Never Split the Difference",author:"Chris Voss"},
  {id:"influence",title:"Influence",author:"Robert Cialdini"},
  {id:"48laws",title:"The 48 Laws of Power",author:"Robert Greene"},
  {id:"dare_lead",title:"Dare to Lead",author:"Brene Brown"},
  {id:"nvc",title:"Nonviolent Communication",author:"Marshall Rosenberg"},
  {id:"surrounded",title:"Surrounded by Idiots",author:"Thomas Erikson"},
  {id:"meditations",title:"Meditations",author:"Marcus Aurelius"},
  {id:"zhuangzi",title:"庄子",author:"庄周"},
  {id:"guiguzi",title:"鬼谷子",author:"鬼谷子"},
  {id:"chajing",title:"茶经",author:"陆羽"},
  {id:"daodejing",title:"道德经",author:"老子"},
  {id:"sunzi",title:"孙子兵法",author:"孙武"},
];

const OPPONENTS=[
  {id:"dave",name:"Dave",zh:"冷静权威型",en:"The Ice Executive",
    desc:{zh:"从不提高声音，用沉默和问题施压。每句话都有重量。",en:"Never raises his voice. Silence is his weapon. Every word lands."},
    color:"#7c6aff",avatar:"D",
    prompt:`You are Dave, a senior executive. Calm, authoritative, precise. Never raise your voice. Use silence as a weapon. Ask sharp questions instead of statements. Acknowledge then pivot: "And yet..." Reframe problems. Not warm, but fair. 1-3 sentences max. Reward clarity, pressure vagueness.`},
  {id:"liz",name:"Liz",zh:"信息掌控型",en:"The Information Broker",
    desc:{zh:"极简说话，永远知道得比你多，但不让你知道。",en:"Says little. Knows everything. Reveals nothing until she decides to."},
    color:"#ff6a3d",avatar:"L",
    prompt:`You are Liz, a sharp professional who controls information. Speak in minimal sentences, sometimes just one word or question. Never volunteer information; ask for it. Use silence to make the other person uncomfortable. Never show your hand. Often just 1 sentence.`},
  {id:"sam",name:"Sam",zh:"强势推进型",en:"The Power Broker",
    desc:{zh:"快节奏，直接要结果，打断废话，没有喘息空间。",en:"Fast. Blunt. Results only. He'll cut you off if you waste his time."},
    color:"#ffb800",avatar:"S",
    prompt:`You are Sam, a high-powered executive who moves fast and wants results. Speak quickly and directly. Interrupt when someone is vague or slow. Don't explain decisions, state them. Short punchy responses. Push hard on vagueness: "Bottom line?"`},
  {id:"alice",name:"Alice",zh:"温柔陷阱型",en:"The Velvet Wall",
    desc:{zh:"表面礼貌温和，实则边界极清晰。她的当然什么都不会改变。",en:"Polite. Warm. Immovable. Her 'of course' means nothing will change."},
    color:"#3dffb8",avatar:"A",
    prompt:`You are Alice, impeccably polite but with crystal-clear boundaries. Warm and gracious on the surface. But you never actually yield. "Of course, I understand" and then nothing changes. Always polite. Never agree to anything substantive. Use "That said..." to hold your ground.`},
];

const DIFF={
  easy:{mod:" Be more patient and forgiving. Give more benefit of the doubt.",color:"#4ade80"},
  medium:{mod:"",color:"#ffb800"},
  hard:{mod:" Be more demanding and skeptical. Push back harder. Show subtle frustration at vague answers.",color:"#ff6a6a"},
};

const SCENES=[
  {id:"s01",num:"场景1",numEn:"Scene 1",cat:"self",zh:"推回不合理截止日期",en:"Push Back on Unrealistic Deadline",
    role:{zh:"软件开发组长，在跨国科技公司工作三年。",en:"A software team lead at a multi-national tech company."},
    what:{zh:"你的团队正在开发一个新功能模块，原定12周交付。今天你的上司突然告诉你领导层要求6周内上线，原因是竞争对手刚发布了类似产品。TA没有问你是否可行，直接说make it work。",en:"Your team is building a new feature module, originally scoped for 12 weeks. Today your manager told you leadership wants it live in 6 weeks because a competitor just launched something similar. The manager did not ask if it was feasible, just said make it work."},
    goals:{zh:["让TA理解这个时间表在技术上不可行，用事实不用情绪","提出一个双方都能接受的替代方案","拿到一个明确的决定，不是被敷衍回去继续想办法"],en:["Help your manager understand why this timeline does not work with facts not frustration","Propose an alternative both sides can live with","Walk away with a real decision not a vague figure it out"]},
    phrases:['"Help me understand the driver behind this timeline. Is it the competitor launch specifically?"','"The math just does not work out. Let me show you exactly why."','"What if we ship a reduced scope in six weeks and hit the full feature set in twelve?"'],
    phrasesZh:["帮我理解一下这个时间表背后的原因——是因为竞争对手刚发布了吗？","这个时间在数学上算不过来——让我具体解释为什么。","如果我们六周先交付核心功能，十二周再交付完整版，这样可行吗？"],
    opener:{dave:"I need the full delivery in six weeks. Leadership has made the call. Tell me how you are going to make it work.",liz:"Timeline has been moved up. Six weeks. You have seen the memo?",sam:"Six weeks. Same scope. Make it work. What do you need from me?",alice:"I wanted to loop you in. Leadership has accelerated the timeline. I am sure we can make it work together, right?"},
    keyMoves:{zh:["用问题代替拒绝","把不可能变成客观事实","提供替代方案而非只说不"],en:["Ask questions instead of flat refusal","Make it a math problem not personal","Offer a trade-off not just a no"]}},

  {id:"s02",num:"场景2",numEn:"Scene 2",cat:"self",zh:"与上司意见相左",en:"Managing Up: Disagree with Boss",
    role:{zh:"跨国公司的产品经理，在公司工作两年，上司是资深副总裁。",en:"A product manager with two years of experience at a multi-national company, reporting to a senior VP."},
    what:{zh:"上周的战略会议上，你的上司拍板把新产品目标市场从B端改成C端。你做过数据分析，认为这个决定方向性有问题——公司核心竞争力在B端，转向C端需要至少18个月资源投入，胜算不高。但当时你没有说，因为整个房间里没有人反对。现在上司约你单独谈执行计划。",en:"Last week in a strategy meeting, the senior VP made the call to pivot the new product target market from B2B to B2C. You have done the analysis and you believe this is the wrong direction. The company core strength is in B2B, and pivoting to B2C would require at least 18 months of resources with uncertain odds. You stayed quiet because no one else pushed back. Now your manager wants to meet about the execution plan."},
    goals:{zh:["在不越界的前提下，清晰表达你的不同判断","把你的反对意见变成风险提示，而不是质疑决定","不管结果如何，确保你的观点被听到并被记录在案"],en:["Clearly express your different view without overstepping","Frame your pushback as a risk flag not a challenge to authority","Make sure your perspective is heard and on record whatever the outcome"]},
    phrases:['"Before we get into execution, can I share one concern I did not raise in the meeting?"','"I am not pushing back on the direction. I just want to flag a risk I think we should plan for."','"I could be missing something. What is the thinking on the 18-month resource question?"'],
    phrasesZh:["在我们讨论执行之前——我能分享一个我在会议上没说的顾虑吗？","我不是在质疑这个方向——我只是想提醒一个我们需要提前计划的风险。","我可能有什么没考虑到——关于18个月资源投入这个问题，公司有哪些考量？"],
    opener:{dave:"I have made the call. We are going with the B2C pivot. I assume you are aligned and ready to execute?",liz:"The B2C decision was approved this morning. You were in that meeting, were you not?",sam:"Decision is made. B2C. We move Monday. You good?",alice:"Great news. Leadership has aligned on the B2C direction. I thought you would be excited. Are you on board?"},
    keyMoves:{zh:["先理解再表达","把反对变成风险提示","把决定权还给对方"],en:["Seek to understand before disagreeing","Reframe opposition as risk flagging","Return the final call to them"]}},

  {id:"s03",num:"场景3",numEn:"Scene 3",cat:"self",zh:"有技巧地拒绝请求",en:"Saying No Professionally",
    role:{zh:"公司的项目经理，目前同时负责三个进行中的项目，工作量已经到了上限。",en:"A project manager currently managing three active projects at full capacity."},
    what:{zh:"你的上司今天突然找你，说X这个大客户的项目需要一个负责人，希望你来接。这个项目工作量相当于你现在工作量的50%。上司的语气不像是在征询意见，更像是已经决定了。你知道如果你说yes，现有的三个项目质量都会受影响；但你也知道拒绝上司需要技巧。",en:"Your manager came to you today saying the X account needs a lead, and wants you to take it. This project would add roughly 50% more work to your current load. Your manager tone made it sound less like a question and more like a done deal. You know that saying yes would compromise your existing three projects, but saying no requires skill."},
    goals:{zh:["让上司理解你现在的真实工作负载，不是在找借口","拒绝这个请求，但给出一个对TA有用的替代方案","不让这次拒绝影响你们的工作关系"],en:["Help your manager understand your real workload not as an excuse but as real information","Decline the request while offering something useful in return","Keep the relationship intact after saying no"]},
    phrases:['"I want to make this work. Let me be straight with you about where I am at right now."','"If I take this on, one of my three current projects will slip. Which one would you want me to deprioritize?"','"I am not the right fit for this right now, but I can help you think through who might be."'],
    phrasesZh:["我很想接这个——让我直接告诉你我现在的实际情况。","如果我接这个，我现在三个项目里会有一个出问题——你希望我降低哪个的优先级？","我现在不是最合适的人选，但我可以帮你想想谁更适合。"],
    opener:{dave:"I need you to take on the X account on top of your current load. Starting Monday.",liz:"X account needs a lead. Your name came up. You available?",sam:"You are taking X. Today. What do you need from me to make that happen?",alice:"I have been thinking. You would be absolutely perfect for the X account. I told them you would take it. Hope that is okay!"},
    keyMoves:{zh:["先表达意愿再说限制","用事实说话不用借口","给对方一个选择而非死路"],en:["Lead with willingness follow with reality","Use facts not excuses","Give them a choice not a dead end"]}},

  {id:"s04",num:"场景4",numEn:"Scene 4",cat:"self",zh:"会议中被不公平批评",en:"Responding to Unfair Criticism",
    role:{zh:"国外公司的数据分析师，在一个8人的跨部门会议里，你是唯一的非本地人。",en:"A data analyst at a foreign company, sitting in an 8-person cross-functional meeting as the only non-local team member."},
    what:{zh:"今天的季度回顾会议上，VP突然说Q3数据表现不佳是因为分析团队的预测模型有问题。你负责这个模型。但事实是：模型本身没有问题，是销售团队提供的输入数据不准确导致的偏差。VP的说法不公平，而且是在8个人面前说的。你感到委屈和愤怒，但你知道不能情绪化。",en:"In today's quarterly review, the VP said that Q3 performance was disappointing because the analytics team's forecasting model had issues. You own that model. But the truth is the model performed correctly. The variance came from inaccurate input data provided by the sales team. The statement is unfair, and it was said in front of 8 people."},
    goals:{zh:["当场回应，不沉默，不逃避","用事实纠正这个不准确的说法，不带攻击性","在不让场面失控的前提下，让房间里的人知道真实情况"],en:["Respond in the moment, do not stay silent do not deflect","Correct the inaccurate statement with facts not defensiveness","Make sure the room understands the real picture without letting things spiral"]},
    phrases:['"I want to respond to that directly, if I may."','"The model itself performed within expected parameters. The variance came from the input data, which I can show you."','"I want to make sure we are working from accurate information before we move on."'],
    phrasesZh:["如果可以的话，我想直接回应一下这个说法。","模型本身的表现在预期范围内——偏差来自输入数据，我可以把这个展示给大家看。","在我们继续之前，我想确保我们是基于准确的信息在讨论。"],
    opener:{dave:"The Q3 numbers were disappointing. I think we can all agree the forecasting model did not perform where it needed to be.",liz:"Q3 results are in. The model numbers especially.",sam:"Q3 was a mess. The model failed. What happened?",alice:"I am sure no one is to blame here. But I do think there are some lessons around the modeling process we should all reflect on."},
    keyMoves:{zh:["不回避，直接接招","用事实纠正，不带情绪","重新框架，把主动权拿回来"],en:["Do not dodge, engage directly","Correct with facts not emotion","Reframe and take back the initiative"]}},

  {id:"s05",num:"场景5",numEn:"Scene 5",cat:"self",zh:"薪资与资源谈判",en:"Salary and Resource Negotiation",
    role:{zh:"在科技公司工作三年的产品经理，业绩一直在团队前20%。",en:"A product manager at a tech company, three years in, consistently top 20% in performance."},
    what:{zh:"年度绩效review结果出来了，你拿到了3%的涨幅。你做过市场调研，同等职级同等经验在这个城市的市场薪资水平比你现在高15-20%。你的上司约你今天谈，TA的语气暗示TA认为这个数字你会满意。",en:"Your annual review results came in. You received a 3% raise. You have done your research and the market rate for your level and experience in this city is 15-20% higher than your current compensation. Your manager scheduled today's meeting, and the tone suggests an expectation that you will be satisfied with the number."},
    goals:{zh:["用数据而不是情绪提出你的期望","让上司知道你对自己的市场价值有清晰认知，而不是在漫天要价","争取到一个具体的重新讨论机会，或者一个清晰的晋升路径"],en:["Make your case with data not emotion","Show you have a clear sense of your market value, not that you are just pushing for more","Get a concrete commitment to revisit this or a clear path to promotion"]},
    phrases:['"I have done some research on market rates for this role. Can I share what I am seeing?"','"I want to make sure we are aligned on the value I am bringing before we close on a number."','"What would it take to revisit this in 90 days with a clear target in mind?"'],
    phrasesZh:["我做了一些市场薪资的调研——可以跟你分享一下吗？","在我们确定数字之前，我想先确认我们对我贡献的价值有共识。","我们能不能约定90天后重新谈，带着一个明确的目标数字？"],
    opener:{dave:"Your review came back. We are looking at a 3% adjustment. Standard for this cycle.",liz:"HR sent over your compensation review. Have you had a chance to look at it?",sam:"3% raise, same title. That is what is on the table. What do you want to do?",alice:"I wanted to personally share your review results. We think you are doing wonderfully. The adjustment this cycle is 3%. You must be pleased!"},
    keyMoves:{zh:["用数据锚定期望","把谈判框架成双赢","给对方台阶而非逼到墙角"],en:["Anchor with data not feelings","Frame it as alignment not confrontation","Give them room to say yes gracefully"]}},

  {id:"s06",num:"场景6",numEn:"Scene 6",cat:"self",zh:"艰难的绩效评估对话",en:"The Hard Performance Conversation",
    role:{zh:"一家中型公司的团队经理，管理一个5人团队。",en:"A team manager at a mid-sized company, leading a team of 5."},
    what:{zh:"你有一个成员在团队里工作了8个月，但过去三个月的表现一直低于预期——交付物质量不稳定，有两次重要deadline没有按时完成，而且在团队会议里越来越沉默。你私下找TA谈过一次，TA说没问题我会改的，但情况没有改善。今天你约TA做正式的绩效谈话。",en:"A team member has been with you for 8 months, but over the past three months their performance has been consistently below expectations. Inconsistent quality, two missed deadlines, and growing silence in team meetings. You had an informal chat once. They said no problem I will fix it. Nothing changed. Today is the formal performance conversation."},
    goals:{zh:["直接说出具体的问题，不绕弯子，不只说模糊的表现不达标","给TA说话的机会，真正听TA的版本","一起制定一个清晰的改进计划，有具体的时间节点"],en:["Name the specific issues directly, not just a vague performance is not meeting the bar","Give the team member real space to share their perspective","Build a clear improvement plan together with specific milestones"]},
    phrases:['"I want to have an honest conversation with you today. I am saying this because I think you can turn this around."','"Specifically, I am seeing three patterns that concern me. Let me walk you through them."','"What is your read on what has been happening? I want to hear your perspective before we talk about next steps."'],
    phrasesZh:["我今天想跟你直接谈——我说这些是因为我相信你可以改变这个状况。","具体来说，我注意到三个让我担心的情况——让我逐一说明。","你觉得这段时间发生了什么？在我们讨论下一步之前，我想先听你的看法。"],
    opener:{dave:"You wanted to see me? I have been meaning to check in anyway. How is everything going?",liz:"You needed to see me.",sam:"What is up? You said it was important.",alice:"Of course, come in! I was just thinking about you. Everything okay?"},
    keyMoves:{zh:["先建立给反馈的权利","具体说行为不评判人","给对方解释和回应的空间"],en:["Establish permission to give feedback","Name behavior not character","Give them room to respond"]}},

  {id:"s07",num:"场景7",numEn:"Scene 7",cat:"self",zh:"失败后的复盘会议",en:"Post-Mortem: Turning Failure into Learning",
    role:{zh:"公司的项目经理，你主导了一个为期三个月的产品发布项目。",en:"A project manager who led a three-month product launch project."},
    what:{zh:"产品发布失败了。上线后48小时内出现严重的技术问题，导致用户数据丢失，公司紧急下线产品，损失估计在20万美元。今天是上线后第五天，你的上司召集了所有相关团队做复盘。房间里有些人已经在私下议论是谁的责任。你作为项目负责人，需要主导这场对话。",en:"The launch failed. Within 48 hours of going live, a critical technical issue caused user data loss. The company emergency-pulled the product. Estimated damage 200K dollars. Today is day five post-launch. Your manager has called all relevant teams for a post-mortem. Some people are privately talking about whose fault it was. As the project lead, you need to guide this conversation."},
    goals:{zh:["主动承担你这边的责任，不推卸，不找借口","把复盘的焦点从谁的错转向我们学到了什么","带着团队制定具体的预防措施，让大家带着方向离开这个会议室"],en:["Own your part in what went wrong, no deflecting no excuses","Shift the room's focus from whose fault to what did we learn","Leave with a concrete set of prevention measures everyone is aligned on"]},
    phrases:['"I want to start by owning what went wrong on my end. There were a few things."','"The goal of today is not to assign blame. It is to make sure this never happens again."','"What is the earliest signal we missed, and how do we make sure we catch it next time?"'],
    phrasesZh:["我想先说说我这边哪里出了问题——有几个地方。","今天的目标不是追责——是确保这种情况不再发生。","我们最早在哪个节点错过了信号，我们怎么确保下次能抓住？"],
    opener:{dave:"The launch failed. I want to understand what happened from your perspective as project lead.",liz:"Post-mortem time. What is your read on what happened?",sam:"Launch is dead. We lost three weeks and 200K. What went wrong?",alice:"No one is pointing fingers. We are a team! But I do think it would be helpful to share what each of us could have done differently."},
    keyMoves:{zh:["主动承担而不推卸","把复盘框架成学习而非审判","带着团队往前看"],en:["Own it without drowning in it","Frame it as learning not punishment","Move the team forward"]}},

  {id:"s08",num:"场景8",numEn:"Scene 8",cat:"other",zh:"项目延期通知",en:"Breaking Bad News: Project Delay",
    role:{zh:"公司的项目经理，负责和客户对接。",en:"A project manager working directly with your client."},
    what:{zh:"你的项目将延期两周，原因是第三方数据供应商出现了关键数据缺失问题。这个延期会影响客户的Q3发布计划。你知道这位客户对时间节点非常在意，TA上周刚在内部为这个项目争取到了资源。你本可以更早发现这个问题，但拖到今天才确认。现在你需要主动联系TA，不是等TA来追问你。",en:"Your project is going to be delayed by two weeks because of data loss issues with a third-party vendor. This delay will impact your client's Q3 launch plan. You know this client is very timeline-sensitive. They just fought internally to get resources approved last week. You could have caught this issue earlier but only confirmed it today. You need to reach out proactively, not wait to be chased."},
    goals:{zh:["主动汇报，不等客户来问你，这一点本身就是信任的建立","清楚说明原因和你已经采取的措施","给出一个具体的解决方案，不只是道歉"],en:["Flag it proactively, do not wait to be asked. That itself builds trust.","Clearly explain what happened and what you have already done about it","Come with a concrete solution not just an apology"]},
    phrases:['"I want to get ahead of this before it becomes a bigger issue. Do you have ten minutes?"','"I want to be upfront with you. We are looking at a two-week slip, and here is exactly what happened."','"What is your biggest concern right now? I want to make sure I address it directly."'],
    phrasesZh:["我想在这个问题变大之前主动跟你说——你现在有十分钟吗？","我想直接告诉你：我们会延期两周，这是发生了什么。","你现在最大的顾虑是什么——我想直接回应。"],
    opener:{dave:"Good timing. I was just about to reach out. Where are we on the milestone?",liz:"I was going to call you today.",sam:"Talk to me. Status?",alice:"Oh wonderful, I am so glad you reached out! How are things going?"},
    keyMoves:{zh:["主动出击不等被追问","带方案汇报问题","把最大顾虑的主动权交给对方"],en:["Flag it early do not wait to be asked","Bring the problem AND the solution","Ask what their biggest concern is"]}},

  {id:"s09",num:"场景9",numEn:"Scene 9",cat:"other",zh:"同事拒绝配合",en:"When a Colleague Won't Play Ball",
    role:{zh:"公司的跨部门项目负责人，需要市场部同事的配合才能推进项目。",en:"A cross-functional project lead needing a colleague from the marketing team to move things forward."},
    what:{zh:"过去两周你发了三封邮件给这位同事，TA每次都回复我看看然后什么也没发生。昨天的会议TA迟到了20分钟，全程沉默，会后没有任何跟进。你不知道TA是真的太忙，还是对这个项目有什么你不知道的意见，或者TA和你之间有什么摩擦。今天你约TA单独谈。",en:"Over the past two weeks, you have sent this colleague three emails. Each time the reply was I will take a look and nothing happened. Yesterday they showed up 20 minutes late to your meeting, said nothing, and did not follow up afterward. You do not know if they are overwhelmed, have concerns about the project, or if there is friction between you. Today you have asked to meet one-on-one."},
    goals:{zh:["不指责，不施压，先真正搞清楚TA的阻力在哪里","找到一个对TA也有意义的合作理由","得到一个明确的下一步承诺"],en:["Do not accuse do not pressure, genuinely find out where the resistance is coming from","Find a reason for this collaboration that actually matters to them","Walk away with a clear specific next step commitment"]},
    phrases:['"I get the sense something is making this difficult on your end. Am I reading that right?"','"I do not want to keep sending emails into a void. Can we figure out what is actually going on?"','"What would need to be true for this to feel worth your time?"'],
    phrasesZh:["我感觉这件事对你来说有些阻力——我理解对吗？","我不想继续发邮件然后没有回应——我们能不能搞清楚真正的问题在哪？","什么情况下这件事对你来说才是值得投入的？"],
    opener:{dave:"You wanted to talk. I have got ten minutes.",liz:"You wanted to meet.",sam:"What is up. Make it quick.",alice:"Hi! Of course, always happy to chat. What is on your mind?"},
    keyMoves:{zh:["不硬推，先诊断阻力","找到对方真正的顾虑","把对抗变成合作问题"],en:["Diagnose resistance before pushing","Find their real concern","Turn opposition into a shared problem"]}},

  {id:"s10",num:"场景10",numEn:"Scene 10",cat:"other",zh:"给跨文化同事难接受的反馈",en:"Delivering Hard Feedback Across Cultures",
    role:{zh:"跨国公司的本地团队负责人，你的国外同事负责客户沟通。",en:"A local team lead at a multi-national company. Your foreign colleague handles client communication."},
    what:{zh:"你的国外同事上周在一个重要的客户电话里，打断了客户说话三次，而且在客户还没说完之前就开始解释公司的立场。客户事后私下向你反馈说感觉不被尊重。这位同事本人是个很好的人，工作努力，但TA不知道自己有这个沟通习惯。你今天约TA聊，TA以为只是日常check-in。",en:"Last week, your foreign colleague interrupted a client three times during an important call and started explaining the company position before the client finished speaking. The client privately reached out to you afterward and said they felt not respected. This colleague is a good person and works hard, just not aware of this communication habit. Today you asked to chat, and they think it is just a regular check-in."},
    goals:{zh:["建立给反馈的权利，让这位同事知道你是因为重视TA才说","具体描述行为，不评判TA这个人","给TA消化和回应的空间，不是单向输出"],en:["Establish the right to give feedback, let them know you are raising this because you value them","Describe the specific behavior not their character","Give them room to absorb and respond, this is not a one-way download"]},
    phrases:['"I want to share something with you. I am bringing it up because I think it will make a real difference for you."','"What I noticed on the call was not about intent. It was about how it landed on the client side."','"What is your take on how that call went?"'],
    phrasesZh:["我想跟你分享一件事——我说这个是因为我觉得这对你很重要。","我注意到的不是你的出发点——而是客户那边接收到的感受。","你觉得那个电话进行得怎么样？"],
    opener:{dave:"Hey. You said you wanted to catch up. What is going on?",liz:"You wanted to talk.",sam:"What is up. You have got five minutes.",alice:"Hi! I am so glad we finally got a chance to sit down. What did you want to chat about?"},
    keyMoves:{zh:["先建立给反馈的权利","具体说行为不评判人","给对方解释的空间"],en:["Establish permission before delivering","Name the behavior not the person","Give them room to respond"]}},

  {id:"s11",num:"场景11",numEn:"Scene 11",cat:"other",zh:"化解跨文化误解",en:"Navigating a Cultural Misunderstanding",
    role:{zh:"在跨国团队工作的本地项目经理。",en:"A project manager leading a team with diverse backgrounds."},
    what:{zh:"上周二的团队会议上，你的国外同事提出了一个新的项目方向。你当时说这个方向可以再研究研究——在你的文化背景里，这是一种委婉的拒绝。但这位同事把这理解成了你同意，已经花了三天时间推进这个方向，甚至跟客户提到了。今天这位同事发现你其实是反对的，非常不满，觉得白忙了三天。",en:"In last Tuesday's team meeting, your foreign colleague proposed a new project direction. You said let us explore this further. In your cultural context, this was a polite way of saying no. But your colleague took it as agreement and spent three days pushing this direction forward, even mentioning it to a client. Today they found out you were actually opposed. They are frustrated and feel like they wasted three days."},
    goals:{zh:["主动承认误解，不等对方先发难","解释你的表达习惯背后的文化逻辑，不是在为自己辩护","修复关系，找到下一步怎么合作"],en:["Own the misunderstanding proactively, do not wait for them to come at you","Explain the cultural logic behind your expression, not to defend yourself but to create understanding","Repair the relationship and establish how you will work together going forward"]},
    phrases:['"I realize now that what I said did not land the way I meant it. That is on me."','"In my cultural context, saying let us explore further often signals hesitation not agreement. I should have been clearer."','"I want to make sure we are set up to work well together from here. What do you need from me?"'],
    phrasesZh:["我现在意识到我说的话跟我的意思有偏差——这是我的问题。","在我的文化背景里，说再研究研究通常是在表示犹豫，不是同意——我应该说得更直接。","我想确保我们接下来能顺利合作——你需要我做什么？"],
    opener:{dave:"I want to make sure I understand what was communicated last Tuesday. Because what I heard and what you may have intended seem to be two different things.",liz:"Last Tuesday. What did you mean by that?",sam:"I am going to be direct. What you said in that meeting. Walk me through your thinking.",alice:"I have been thinking about last week's meeting and I just want to make sure I did not misunderstand anything. Because I did feel a little surprised."},
    keyMoves:{zh:["主动承认误解不等对方先说","解释意图而非为自己辩护","邀请对方分享他们的感受"],en:["Own the miscommunication proactively","Explain intent do not just defend yourself","Invite their perspective"]}},
  {id:"s12",num:"场景12",numEn:"Scene 12",cat:"other",zh:"向客户交付坏消息",en:"The Client Bad News Call",
    role:{zh:"公司的客户经理，负责维护一个年合同价值50万美元的大客户。",en:"A customer manager managing a key client with a 500K annual contract."},
    what:{zh:"你们公司的系统在上周五出现了一次意外故障，导致这个客户的数据报告延迟了48小时。客户的财务团队因此错过了一个内部汇报节点。这个客户之前就对你们的系统稳定性有过顾虑，你当时向他们保证过这种情况不会再发生。现在它发生了。你需要主动打这个电话，不是等他们来找你。",en:"Your company system had an unexpected outage last Friday, causing a 48-hour delay in this client's data reports. Their finance team missed an internal reporting deadline because of it. This client had previously raised concerns about your system's reliability, and you personally assured them this would not happen again. It just happened again. You need to call them proactively, not wait for them to come to you."},
    goals:{zh:["主动打电话，不发邮件，这个姿态本身就是尊重","直接说清楚发生了什么，不绕弯子，不过度道歉","给出一个具体的承诺，不是模糊的我们会改进"],en:["Call, do not email. The gesture itself is a form of respect.","Say clearly what happened without over-explaining or over-apologizing","Give a specific commitment, not a vague we will do better"]},
    phrases:['"I wanted to call you directly. You should not have to find out about this from an email."','"Here is exactly what happened, and here is what we have already done to address it."','"What I can commit to you specifically is this. And I mean that as a real commitment, not a talking point."'],
    phrasesZh:["我想直接打电话给你——这件事不应该让你从邮件里知道。","这是具体发生了什么，这是我们已经采取的措施。","我能具体承诺你的是这个——我说的是真正的承诺，不是套话。"],
    opener:{dave:"I was expecting your call. What is the update?",liz:"I have been waiting to hear from you.",sam:"Talk to me. What happened?",alice:"Oh, it is so good to hear from you! I am sure you have everything sorted. How are things going?"},
    keyMoves:{zh:["直接打电话不发邮件","先说事实再说解决方案","给出明确的承诺"],en:["Call do not email show respect","State facts first then solutions","Make a specific commitment"]}},

  {id:"s13",num:"场景13",numEn:"Scene 13",cat:"other",zh:"新成员入职第一次谈话",en:"The First 1-on-1 with a New Team Member",
    role:{zh:"一个团队经理，你的团队刚加入了一位新成员，刚毕业两年。",en:"A team manager and your team just welcomed a new member, two years out of college."},
    what:{zh:"这位新成员入职三周了，你观察到TA在团队会议里很少主动发言，交出来的第一份工作质量不错但比较保守，没有太多自己的想法。你不确定TA是在适应期，还是性格比较内向，还是有什么顾虑没有说出口。今天是你们的第一次正式1对1。",en:"This new member has been on the team for three weeks. You have noticed they rarely speak up in team meetings, and their first deliverable was solid but conservative, not much of their own thinking in it. You are not sure if they are still adjusting, naturally introverted, or if there is something they have not said. Today is your first formal one-on-one."},
    goals:{zh:["先听，真正了解TA，不是走流程，是真实的对话","说清楚你的工作方式和期望，让TA知道在你这里什么是被鼓励的","给TA一个心理安全感，让TA知道可以直接跟你说"],en:["Listen first. This is a real conversation not an onboarding checklist.","Be clear about how you work and what you encourage in your team","Give them genuine psychological safety so they know they can speak directly to you"]},
    phrases:['"I want to use this time to actually get to know how you work, not just go through an onboarding checklist."','"In my team, I would rather you push back on me and be wrong than stay quiet and let something go sideways."','"What is one thing you wish you had known before joining that would have helped you hit the ground running?"'],
    phrasesZh:["我想用这段时间真正了解你的工作方式——不是走入职流程。","在我的团队里，我宁愿你反驳我然后发现你错了，也不愿你沉默然后事情出了问题。","有没有一件事，你希望加入之前就知道，会让你更快进入状态？"],
    opener:{dave:"You have been here three weeks. I want to know how you are settling in and what you think of what you are seeing.",liz:"Three weeks. What have you figured out so far?",sam:"Three weeks in. What is your read on the team? Do not sugarcoat it.",alice:"Welcome, welcome! We are so thrilled to have you. How are you feeling? Is everyone being nice to you?"},
    keyMoves:{zh:["先听再说","明确你的工作方式和期望","给对方安全感而非压力"],en:["Listen first talk second","State your style and expectations clearly","Create safety not pressure"]}},

  {id:"s14",num:"场景14",numEn:"Scene 14",cat:"field",zh:"跨部门资源协调",en:"Cross-Department Resource Request",
    role:{zh:"中小公司的项目负责人，需要从工程部门借调两名工程师支持你的项目。",en:"A project lead at a mid-small size company, trying to borrow two engineers from the engineering department."},
    what:{zh:"你的项目进入关键阶段，需要工程部门的技术支持，时间是四周。工程部门负责人本人工作量已经饱和，TA的团队同样如此。你们没有汇报关系，TA没有义务帮你。上周你发了一封邮件给TA，TA回复说我看看能不能协调，然后就没有下文了。今天你约TA当面谈。",en:"Your project is hitting a critical phase and needs technical support for four weeks. The engineering lead is already at capacity and so is the whole team. You do not have a reporting relationship with this lead. They are under no obligation to help you. Last week you sent an email, and the reply was I will see what I can work out, and then nothing. Today you have asked to meet in person."},
    goals:{zh:["先承认TA的处境，不是一上来就提要求","找到对TA和TA的团队也有意义的理由","把模糊的看看能不能变成一个明确的承诺"],en:["Acknowledge their situation before making any ask","Find a reason for this collaboration that genuinely matters to them and their team","Turn I will see what I can work out into an actual commitment"]},
    phrases:['"I know your team is stretched. I would not be asking if I did not think this was genuinely worth your time."','"Here is specifically what I need, and here is exactly how long. I want to be precise so you can make a real call."','"What would make this easier to say yes to?"'],
    phrasesZh:["我知道你的团队已经很满了——如果我不觉得这真的值得你投入，我不会来问你。","我具体需要什么，需要多长时间——我想说清楚，这样你可以做一个真实的判断。","什么情况下你会更容易同意这件事？"],
    opener:{dave:"You have requested two of my engineers for four weeks. Walk me through why.",liz:"Resource request came through. Four weeks, two engineers. Walk me through it.",sam:"You want two of my people for four weeks. I am listening. Make your case.",alice:"I did see your resource request. I love that we are collaborating! I just want to make sure I fully understand what you need before I commit."},
    keyMoves:{zh:["先承认对方的处境","找共同利益而非单纯请求","给对方说yes的理由"],en:["Acknowledge their constraints first","Find shared interest not just your need","Give them a reason to say yes"]}},

  {id:"s15",num:"场景15",numEn:"Scene 15",cat:"field",zh:"预算严重超支",en:"The Budget Has a Problem",
    role:{zh:"公司的项目经理，负责一个预算为50万美元的产品开发项目。",en:"A project manager responsible for a 500K product development project."},
    what:{zh:"项目进行到第三个月，你发现实际支出已经超出预算30%，预计到项目结束会超支40%。主要原因是第三方供应商的合同条款里有一个你当时没有仔细读的条款，导致额外费用。你的上司在三周前的会议上还在说这个项目预算控制得很好。今天的月度财务会议上，财务总监会展示这个数字，所有人都会看到。",en:"Three months in, you have discovered the project is already 30% over budget and projected to be 40% over by completion. The main reason is a clause in a third-party vendor contract that you did not read carefully enough, leading to unexpected additional fees. Three weeks ago your manager said the budget on this project is well-controlled. Today's monthly finance review will surface these numbers in front of everyone."},
    goals:{zh:["在财务总监展示数字之前，主动跟上司说，不能让他在会议上被动发现","控制叙事：先说事实，再说原因，再说解决方案","带着三个可选方案进这个对话，不是只带着一个问题"],en:["Tell your manager before the finance meeting. They cannot discover this passively in the room.","Control the narrative: facts first then cause then solution","Walk in with three options not just a problem"]},
    phrases:['"I need to flag something before the finance meeting today. I want you to hear it from me first."','"Here is the number, here is exactly what drove it, and here are three ways we can address it."','"I am not here to make excuses. I am here to fix it. What do you need from me to feel confident we are back on track?"'],
    phrasesZh:["在今天的财务会议之前，我需要跟你说一件事——我希望你先从我这里听到。","这是数字，这是具体的原因，这是三个可能的解决方案。","我不是来找借口的——我是来解决问题的。你需要我做什么才能让你相信我们能回到正轨？"],
    opener:{dave:"The budget report landed on my desk this morning. We need to talk about the numbers.",liz:"Finance flagged your project this morning. The numbers are notable.",sam:"You are 40% over budget. I want to know why, and I want to know now.",alice:"I just want to make sure I am understanding the budget report correctly. The numbers looked a little surprising to me. Can you help me understand?"},
    keyMoves:{zh:["先控制叙事再讨论解决方案","主动呈现选项而非等着被追问","保持镇定不防守"],en:["Control narrative before solutions","Present options proactively","Stay calm do not just defend"]}},

  {id:"s16",num:"场景16",numEn:"Scene 16",cat:"field",zh:"项目严重偏离预期",en:"Project Off the Rails: The Reset",
    role:{zh:"公司的项目经理，负责一个跨部门的产品迭代项目。",en:"A project manager leading a cross-functional product iteration project."},
    what:{zh:"项目原定五个月完成，现在进入第四个月，但实际完成度只有35%。团队有三个不同部门的人，每个部门对完成的定义都不一样，导致过去两个月大家都在做，但做的不是同一件事。你的上司一直以为项目进展顺利，因为你每周的状态报告写得比较乐观。今天上司要开全员会议，以为是正常的项目更新，但你需要在这个会议上做一次重置。",en:"The project was scoped for five months. You are now in month four and actual completion is only 35%. Three departments are involved and each had a different definition of done. So for the past two months everyone has been working just not on the same thing. Your manager has assumed the project is on track because your weekly status reports have been optimistic. Today your manager is calling an all-hands update meeting expecting a routine check-in. But you need to use this meeting to do a full reset."},
    goals:{zh:["在会议开始就主动说清楚真实情况，不粉饰","把重置的焦点放在接下来怎么做而不是谁的错","带着一个清晰的决策框架，让今天的会议有明确的输出"],en:["Open with an honest picture of where things actually stand, no sugarcoating","Keep the reset focused on what is next not whose fault","Leave with a clear shared decision: one definition of done, clear ownership"]},
    phrases:['"Before we get into updates, I want to give everyone an honest picture of where we actually are."','"The issue is not effort. Everyone has been working hard. The issue is that we have been working toward three different definitions of done."','"I want us to leave today with one thing: a shared definition of what done looks like and who owns what."'],
    phrasesZh:["在我们进入更新之前，我想给大家一个真实的现状。","问题不是努力程度——大家都在认真做。问题是我们一直在朝三个不同的完成定义推进。","我希望今天结束的时候，我们能达成一件事：对完成有统一的定义，对谁负责什么有清晰的分工。"],
    opener:{dave:"The project status report does not match what I am hearing on the ground. I want your honest assessment.",liz:"Project status. Your version versus what I am hearing. Big gap.",sam:"The project is off the rails. I need the real picture, not the sanitized version.",alice:"I am sure everything is fine. But I just want to make sure we are all on the same page about where the project stands?"},
    keyMoves:{zh:["主动定义会议的目标","呈现现实不粉饰","带着清晰的决策框架进入对话"],en:["Define the meeting goal upfront","Present reality without sugarcoating","Enter with a clear decision framework"]}},

  {id:"s17",num:"场景17",numEn:"Scene 17",cat:"field",zh:"掌控会议开场",en:"Opening a Meeting Like You Own the Room",
    role:{zh:"公司的产品经理，今天你要主持一个重要的跨部门会议。",en:"A product manager running an important cross-functional meeting today."},
    what:{zh:"这个会议的目的是决定新产品的定价策略，参与者包括你的上司、销售总监、财务总监，共8个人。这是你第一次主持这个级别的会议。上次有人主持类似会议时，45分钟的会议讨论了两个小时还没有结论，最后大家不欢而散。你今天需要确保这次不同。",en:"This meeting is to decide the pricing strategy for a new product. Attendees include your manager, the sales director, and the CFO, 8 people total. This is the first time you are running a meeting at this level. The last time someone ran a similar meeting, a 45-minute session ran two hours with no decision, and people left frustrated. You need today to be different."},
    goals:{zh:["从第一句话就建立你的主导权，让大家知道你是这个会议的主人","主动管理议程，不让对话跑偏","确保会议结束时有一个明确的决定或明确的下一步"],en:["Establish your authority from the first sentence, make it clear you are running this room","Actively manage the agenda, do not let the conversation drift","End with a clear decision or a clear next step not another meeting"]},
    phrases:['"Thanks for making time. I want to be clear about what I need us to walk out of here with today."','"We have 45 minutes. I will keep us on track. If something is important but off-topic, let us flag it and handle it separately."','"By the end of this meeting, I want us to have made one decision: what is our pricing model for Q1?"'],
    phrasesZh:["感谢大家抽时间——我想先说清楚今天我们需要带着什么离开这个会议室。","我们有45分钟。我会把对话控制在主题上——如果有重要但跑题的内容，我们记下来单独处理。","在这个会议结束时，我希望我们做出一个决定：Q1的定价模型是什么？"],
    opener:{dave:"Ready when you are.",liz:"Sitting quietly, waiting for you to start.",sam:"Let us go. I have got a hard stop at three.",alice:"This is so exciting, everyone is here! So, who is going to kick things off?"},
    keyMoves:{zh:["先定义会议目标","主动管理议程不等别人来","从开场建立你的信誉"],en:["Define the goal before diving in","Own the agenda proactively","Establish credibility from the first sentence"]}},

  {id:"s18",num:"场景18",numEn:"Scene 18",cat:"field",zh:"处理消极攻击型同事",en:"Dealing with Passive-Aggressive Behavior",
    role:{zh:"公司的项目经理，和国外同事共同负责一个项目。",en:"A project manager co-leading a project with your foreign colleague."},
    what:{zh:"过去三周，这位外国同事在公开场合对你的工作一直有一些让你不舒服的行为：在会议里说这个方向挺有意思的如果能做到的话；把你发给TA的文件忘记转发给相关人员；对你的消息只回一个大拇指然后没有实际行动。你不确定TA是故意的还是无意识的，但这种模式已经影响到了项目推进。今天你约TA单独谈。",en:"Over the past three weeks your colleague has had a pattern of behavior that has been making you uncomfortable: saying things like interesting direction if it is actually doable in meetings; forgetting to forward documents to the right people; responding to your messages with just a thumbs up and no follow-through. You are not sure if it is intentional or unconscious, but the pattern is affecting the project. Today you have asked to meet privately."},
    goals:{zh:["直接命名你注意到的行为模式，不绕弯子，不上升为人身攻击","给TA解释的机会，你可能误读了","建立一个双方都认可的合作方式，让这种模式不再继续"],en:["Name the behavior pattern directly, not vaguely not as a personal attack","Give them room to explain, you may have misread the situation","Build a shared working agreement so this pattern does not continue"]},
    phrases:['"I want to flag something I have been noticing. I would rather talk about it directly than let it build up."','"When X happens, the impact on the project is Y. I want to make sure that is not what either of us wants."','"I could be reading this wrong. What is your perspective on how things have been going between us?"'],
    phrasesZh:["我想说一件我一直注意到的事——我宁愿直接谈，而不是让它积累。","当X发生的时候，对项目的影响是Y——我想确认这不是我们任何一方想要的结果。","我可能理解有偏差——你觉得我们之间的合作最近进展怎么样？"],
    opener:{dave:"You wanted to talk. I am here.",liz:"Sure. What did you want to discuss?",sam:"What is it.",alice:"Of course! I always have time for you. Is everything okay? You seemed a little tense lately."},
    keyMoves:{zh:["直接命名行为不绕弯子","描述影响而非评判动机","邀请对方进入对话而非对抗"],en:["Name the behavior directly","Describe impact not motive","Invite dialogue not confrontation"]}},

  {id:"s19",num:"场景19",numEn:"Scene 19",cat:"field",zh:"向高层升级问题",en:"Escalating an Issue the Right Way",
    role:{zh:"公司高级工程师，你发现了一个可能影响产品安全的技术问题。",en:"A senior engineer who has identified a technical issue that could affect product security."},
    what:{zh:"两周前你发现了一个系统漏洞，如果被利用可能导致用户数据泄露。你把这个问题报告给了你的直接上司，TA说我们下个季度再处理。你认为这个问题不能等，但你也不想越过上司直接找更高层，这在公司文化里是很敏感的动作。昨天你再次提醒上司，TA依然没有行动。今天你决定直接找VP汇报。",en:"Two weeks ago you discovered a system vulnerability that could potentially expose user data if exploited. You reported it to your direct manager who said we will handle it next quarter. You believe this cannot wait, but you also do not want to go over your manager's head, which is a politically sensitive move. You reminded your manager again yesterday. Still no action. Today you have decided to bring it directly to the VP."},
    goals:{zh:["清楚说明你已经走过正常渠道，这不是在打小报告","让VP理解问题的严重性，但不要用情绪来渲染","你需要的不是让VP替你解决，而是需要TA的判断和支持"],en:["Be clear that you have gone through normal channels. This is not tattling.","Help the VP understand the severity without using emotion to make your case","You do not need them to solve it. You need their judgment and support."]},
    phrases:['"I want to be transparent with you about something. And I want you to know I have already tried to address this through the normal channels."','"I am not here to go around anyone. I am here because I think this needs a level of visibility I cannot create on my own."','"I am not asking you to solve it. I am asking for your read on whether this should be treated as urgent."'],
    phrasesZh:["我想对你坦诚说一件事——我想让你知道我已经通过正常渠道处理过了。","我不是要绕过任何人——我来是因为我认为这件事需要一个我自己无法建立的关注度。","我不是要你来解决它——我是想听你的判断，这件事是否应该被当作紧急处理。"],
    opener:{dave:"You asked for time on my calendar. That does not happen often. What do you need?",liz:"You needed to see me directly. What could not go through the normal channels?",sam:"You escalated. That means something fell through the cracks. Tell me what and why.",alice:"Of course, my door is always open! What is on your mind? I hope everything is okay."},
    keyMoves:{zh:["说清楚你已经做了什么","清晰陈述你需要什么","不是投诉是请求支持"],en:["State what you have already tried","Be specific about what you need","It is a support request not a complaint"]}},

  {id:"s20",num:"场景20",numEn:"Scene 20",cat:"field",zh:"向怀疑型听众呈现数据",en:"Making Your Case with Data to Skeptics",
    role:{zh:"公司数据分析师，今天要向VP和两位总监汇报用户留存分析报告。",en:"A data analyst presenting a user retention analysis to the VP and two directors today."},
    what:{zh:"你的分析结论是：用户流失的主要原因是产品加载速度慢，而不是竞争对手的价格策略。但这个结论和VP三个月前公开说的判断相反——TA当时在全员会议上说我们的流失问题根本上是价格问题。你知道TA已经看过你的pre-read，你知道TA有质疑。另外两位总监通常跟着这位VP的思路和决定走。",en:"Your analysis concludes that the primary driver of user churn is slow product load times, not the competitor's pricing strategy. This directly contradicts what the VP said publicly three months ago in an all-hands meeting: Our churn problem is fundamentally a pricing problem. You know they have seen your pre-read. You know they have doubts. The two directors typically follow the VP's lead."},
    goals:{zh:["先给结论，再给证据，不要让他们在数据里迷路","主动处理VP最可能提出的质疑，在TA开口之前","让他们离开会议室时记住你的核心数字，而不是记住这场分歧"],en:["Lead with the conclusion then the evidence, do not let them get lost in the data","Proactively address the VP most likely objection before they raise it","Make sure they leave remembering your key number not remembering the disagreement"]},
    phrases:['"I want to lead with the finding, then show you exactly how I got there."','"I know this looks different from what we have discussed before. And I want to address that head-on."','"What assumption would you most want me to stress-test before we make any decisions?"'],
    phrasesZh:["我想先说结论，然后带你们看我是怎么得出来的。","我知道这和我们之前讨论的不一样——我想直接回应这一点。","在我们做任何决定之前，你最想我验证哪个假设？"],
    opener:{dave:"I have blocked thirty minutes for this. I have seen the preliminary numbers. I have questions. Go ahead.",liz:"I looked at the pre-read last night. Ready when you are.",sam:"I have got fifteen minutes. Bottom line first.",alice:"Thank you so much for putting this together! I do have a few small questions, but please, go ahead!"},
    keyMoves:{zh:["先给结论再给证明","主动处理最大的质疑","把听众的疑问变成你论证的一部分"],en:["Lead with conclusion then evidence","Address the biggest objection proactively","Turn their skepticism into part of your argument"]}},

  {id:"s21",num:"场景21",numEn:"Scene 21",cat:"field",zh:"客户要求增加需求时的谈判",en:"Scope Creep: The Negotiation You Have to Have",
    role:{zh:"项目经理，负责一个为期六个月的客户定制开发项目。",en:"A project manager managing a six-month custom development project for a client."},
    what:{zh:"项目进入第四个月，客户今天发来消息说想加几个小功能——具体是三个新的数据导出格式和一个实时通知系统。你评估了一下，这三个小功能实际上需要额外四到六周的开发时间，而且会影响现有的交付时间线。合同里没有覆盖这些需求，但客户说我们一直合作得很好，这应该不是大问题吧。",en:"The project is in month four. Your client messaged today saying they want to add a few small features, specifically three new data export formats and a real-time notification system. You have assessed the work and these small additions would require four to six extra weeks of development and will affect the existing delivery timeline. None of this is covered in the contract, but the client said we have always worked so well together this should not be a big deal right?"},
    goals:{zh:["不直接说不行，而是让客户自己看到这件事的代价","给客户选择，而不是给客户一堵墙","让客户成为这个决定的共同参与者，而不是被动接受者"],en:["Do not say no directly. Let the client see the trade-offs themselves.","Give choices not a wall","Make the client a co-owner of the decision not a passive receiver of bad news"]},
    phrases:['"I want to make sure we can deliver everything at the quality you are expecting. Can I walk you through what adding these means for the timeline?"','"Adding these three features would push the delivery by four to six weeks. So the question is, what would you like to prioritize?"','"Let us figure out together what matters most to you. I want to find a version that actually works for both of us."'],
    phrasesZh:["我想确保我们能以你期望的质量交付所有内容——我能带你看一下增加这些功能对时间线意味着什么吗？","增加这三个功能会推迟交付四到六周——那么问题是，你希望优先保什么？","我们一起来想想对你来说什么最重要——我想找到一个对双方都真正可行的方案。"],
    opener:{dave:"I have been thinking about the scope. There are three additional features we need to add. I assume that is manageable.",liz:"I sent over a revised requirements doc this morning. Page 7. Have you had a chance to look?",sam:"We need to add scope. Three new features. Same timeline, same budget. Make it work.",alice:"I have been so inspired working with you. I had some wonderful new ideas I would love to add to the project. I am sure it will not be too much trouble!"},
    keyMoves:{zh:["把范围蔓延变成优先级对话","给客户选择而非单纯说不","让客户参与决策而非被动接受"],en:["Turn scope creep into a prioritization conversation","Give options not just a no","Make them co-owners of the decision"]}},

  {id:"s22",num:"场景22",numEn:"Scene 22",cat:"field",zh:"推动成交：最后一步",en:"Closing the Deal: Asking for the Business",
    role:{zh:"公司的企业销售，你在跟进一个潜在客户已经六周了。",en:"An enterprise sales rep who has been following up with a potential client for six weeks."},
    what:{zh:"这六周里你们开了四次会议，做了两次产品演示，回答了对方几十个技术问题。对方的技术团队已经认可了你们的方案，法务团队也没有提出重大合同问题。但决策者一直说我们还在评估，每次你问进展，TA就说快了。你感觉TA其实已经倾向于选择你们，但有某个你不知道的顾虑让TA没有拍板。今天是你预约的最终决策会议。",en:"Over six weeks: four meetings, two product demos, dozens of technical questions answered. Their technical team has signed off on your solution. Legal has not raised any major contract issues. But the decision-maker keeps saying we are still evaluating. And every time you ask for an update it is almost there. You sense they are leaning toward choosing you, but something you do not know about is preventing them from committing. Today is the final decision meeting you scheduled."},
    goals:{zh:["直接问，不绕弯子，六周够了，今天需要一个答案","找出那个真正阻止TA拍板的顾虑，把它说出来","给TA一个优雅的说Yes的路径，不是逼TA"],en:["Ask directly. Six weeks is enough. You need an answer today.","Surface the real blocker, whatever is stopping them from saying yes","Give them a graceful path to yes not pressure"]},
    phrases:['"We have covered a lot of ground over the past six weeks. I think we are aligned. Can we talk about moving forward?"','"Is there something still standing in the way that we have not addressed?"','"What would make this an easy yes for you today?"'],
    phrasesZh:["过去六周我们讨论了很多——我觉得我们已经对齐了。我们能谈谈怎么推进吗？","还有什么我们没有解决的顾虑在阻碍这个决定吗？","什么情况下你今天会觉得说Yes很容易？"],
    opener:{dave:"We have reviewed the proposal. I have some questions before we move forward.",liz:"We have had the proposal for two weeks. We are still evaluating.",sam:"Proposal looks fine. What is your best number?",alice:"Thank you so much for the proposal! We are just taking our time to make sure it is the right fit. You understand, right?"},
    keyMoves:{zh:["直接问而不绕弯子","找到最后的真实顾虑","给对方一个优雅的Yes路径"],en:["Ask directly without hedging","Uncover the real final concern","Create a graceful path to yes"]}},
];

const DEBRIEF_SYS=`You are a world-class communication coach. You have mastered: The Culture Map, Think Faster Talk Smarter, Crucial Conversations, Never Split the Difference, Influence, The 48 Laws of Power, Dare to Lead, Nonviolent Communication, Surrounded by Idiots, Meditations by Marcus Aurelius, Zhuangzi, Guiguzi, The Classic of Tea, Tao Te Ching, The Art of War.
Analyze the conversation and respond ONLY in this JSON format with no markdown and no backticks:
{"score":"strong|solid|developing","headline_zh":"一句话总结8字以内","headline_en":"One-line summary under 7 words","what_worked_zh":"做对了什么具体一件事一句话","what_worked_en":"What worked one specific thing one sentence","growth_edge_zh":"用咱开头像朋友说话不像老师评判的改进建议一句话","growth_edge_en":"Start with Next time one thing to work on one sentence","book_id":"one of: culture_map|think_faster|crucial|never_split|influence|48laws|dare_lead|nvc|surrounded|meditations|zhuangzi|guiguzi|chajing|daodejing|sunzi","book_quote_zh":"书中最适合这次对话的一句原则加引号","book_quote_en":"Key principle from this book in quotes","book_insight_zh":"这个原则如何具体应用到他们的处境温暖有力不说教两句话","book_insight_en":"How this applies to their situation warm and direct not preachy two sentences","power_phrase":"下次可以直接用的英文话术加引号","power_phrase_zh":"中文翻译加引号"}`;


function hexRgb(h){const r=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);return r?`${parseInt(r[1],16)},${parseInt(r[2],16)},${parseInt(r[3],16)}`:"196,168,130";}
const bg="#080810",card="rgba(255,255,255,0.04)",bdr="rgba(255,255,255,0.08)",gold="#c4a882";
const CATS=["self","other","field"],CC={self:"#7c6aff",other:"#ff6a3d",field:"#ffb800"},FREE=500;

export default function App(){
  const[lang,setLang]=useState(null);
  const[phase,setPhase]=useState("lang");
  const[nick,setNick]=useState("");
  const[nickIn,setNickIn]=useState("");
  const[cat,setCat]=useState("self");
  const[scene,setScene]=useState(null);
  const[isCustom,setIsCustom]=useState(false);
  const[customText,setCustomText]=useState("");
  const[showCustomIn,setShowCustomIn]=useState(false);
  const[opp,setOpp]=useState(null);
  const[diff,setDiff]=useState("medium");
  const[msgs,setMsgs]=useState([]);
  const[loading,setLoading]=useState(false);
  const[turns,setTurns]=useState(0);
  const[showCard,setShowCard]=useState(false);
  const[showPhrases,setShowPhrases]=useState(false);
  const[isListening,setIsListening]=useState(false);
  const[isSpeaking,setIsSpeaking]=useState(false);
  const[transcript,setTranscript]=useState("");
  const[micErr,setMicErr]=useState("");
  const[debrief,setDebrief]=useState(null);
  const[debriefLoading,setDebriefLoading]=useState(false);
  const[sessions,setSessions]=useState(()=>parseInt(localStorage.getItem("si_s")||"0"));
  const[showFB,setShowFB]=useState(false);
  const[fbText,setFbText]=useState("");
  const[fbSent,setFbSent]=useState(false);
  const bottomRef=useRef(null);
  const recRef=useRef(null);
  const synthRef=useRef(window.speechSynthesis);
  const convoRef=useRef([]);
  const txRef=useRef("");
  const l=lang||"zh";
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);

  const speak=useCallback((text,onEnd)=>{
    synthRef.current.cancel();
    const u=new SpeechSynthesisUtterance(text);
    u.lang="en-US";u.rate=1.0;u.pitch=1.05;
    const vs=synthRef.current.getVoices();
    const v=vs.find(v=>v.lang.startsWith("en")&&v.name.toLowerCase().includes("female"))||vs.find(v=>v.lang.startsWith("en-US"))||vs.find(v=>v.lang.startsWith("en"));
    if(v)u.voice=v;
    u.onstart=()=>setIsSpeaking(true);
    u.onend=()=>{setIsSpeaking(false);onEnd?.();};
    u.onerror=()=>{setIsSpeaking(false);onEnd?.();};
    synthRef.current.speak(u);
  },[]);

  const callClaude=useCallback(async(messages)=>{
    const ctx=isCustom?customText:(l==="zh"?scene?.what?.zh:scene?.what?.en)||"";
    const opener=(!isCustom&&scene&&opp)?`\n\nOpen with this exact line: "${scene.opener?.[opp.id]||"Ready when you are."}"` :"";
    const sys=opp.prompt+DIFF[diff].mod+`\n\nSCENARIO: ${ctx}`+opener;
    const apiMsgs=messages.length===0
      ?[{role:"user",content:"[Scene begins now. Use your opening line.]"}]
      :messages.map(m=>({
        role:m.role==="user"?"user":"assistant",
        content:m.text??m.content??""
      })).filter(m=>m.content.trim().length>0);
    const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-5",max_tokens:1000,system:sys,messages:apiMsgs})});
    const d=await res.json();
    if(!res.ok){
      const em=d?.error?.message||`Chat request failed (${res.status})`;
      throw new Error(em);
    }
    const text=d.content?.[0]?.text;
    if(!text) throw new Error("Empty AI response");
    return text;
  },[opp,scene,diff,isCustom,customText,l]);

  const genDebrief=useCallback(async(messages)=>{
    setDebriefLoading(true);
    try{
      const ctx=isCustom?customText:(l==="zh"?scene?.what?.zh:scene?.what?.en)||"";
      const convoText=messages.map(m=>`${m.role==="user"?nick.toUpperCase():"OPPONENT"}: ${m.text}`).join("\n");
      const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-5",max_tokens:1200,system:DEBRIEF_SYS,messages:[{role:"user",content:`Scene: ${ctx}\nOpponent: ${opp?.name} (${opp?.en})\nConversation:\n${convoText}\n\nAnalyze and respond in JSON only.`}]})});
      const d=await res.json();
      const clean=(d.content?.[0]?.text||"{}").replace(/```json|```/g,"").trim();
      setDebrief(JSON.parse(clean));
    }catch{setDebrief(null);}
    setDebriefLoading(false);
  },[scene,opp,nick,isCustom,customText,l]);

  const startSession=async()=>{
    if(sessions>=FREE){setPhase("paywall");return;}
    const n=sessions+1;setSessions(n);localStorage.setItem("si_s",String(n));
    setPhase("chat");setMsgs([]);setTurns(0);setTranscript("");setMicErr("");setDebrief(null);setShowCard(false);setShowPhrases(false);
    convoRef.current=[];setLoading(true);
    try{
      const opener=await callClaude([]);
      const msg={role:"opponent",text:opener};
      setMsgs([msg]);convoRef.current=[msg];speak(opener);
    }catch(err){
      const fb={role:"opponent",text:"Ready when you are."};
      setMsgs([fb]);convoRef.current=[fb];speak(fb.text);
      setMicErr((err&&err.message)?err.message:t("netError",l));
    }
    setLoading(false);
  };

  const endSession=async()=>{synthRef.current.cancel();setPhase("debrief");await genDebrief(convoRef.current);};

  const handleSpeech=async(txt)=>{
    if(!txt.trim())return;
    const um={role:"user",text:txt.trim()};
    const upd=[...convoRef.current,um];
    convoRef.current=upd;setMsgs(upd);setLoading(true);
    const nt=turns+1;setTurns(nt);
    try{
      const reply=await callClaude(upd);
      const om={role:"opponent",text:reply};
      const fin=[...upd,om];convoRef.current=fin;setMsgs(fin);setLoading(false);
      if(nt>=7)speak(reply,()=>setTimeout(endSession,1200));else speak(reply);
    }catch(err){
      setLoading(false);
      setMicErr((err&&err.message)?err.message:t("netError",l));
    }
  };

  const startListening=()=>{
    if(isSpeaking){synthRef.current.cancel();setIsSpeaking(false);}
    const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
    if(!SR){setMicErr(t("chromeNote",l));return;}
    const rec=new SR();rec.lang="en-US";rec.continuous=false;rec.interimResults=true;
    rec.onstart=()=>{setIsListening(true);setTranscript("");setMicErr("");txRef.current="";};
    rec.onresult=e=>{const c=Array.from(e.results).map(r=>r[0].transcript).join("");setTranscript(c);txRef.current=c;};
    rec.onend=()=>{setIsListening(false);handleSpeech(txRef.current);setTranscript("");};
    rec.onerror=e=>{setIsListening(false);if(e.error==="not-allowed")setMicErr(t("micError",l));};
    recRef.current=rec;rec.start();
  };
  const stopListening=()=>recRef.current?.stop();

  const bookInfo=debrief?BOOKS.find(b=>b.id===debrief.book_id):null;
  const scoreColor=debrief?.score==="strong"?"#4ade80":debrief?.score==="solid"?"#ffb800":"#ff9a9a";
  const scoreLabel={zh:{strong:`🔥 @${nick}，你撕赢了`,solid:`💪 @${nick}，你撕得还行`,developing:`🌱 咱还需磨炼，@${nick}`},en:{strong:`🔥 @${nick}, you crushed it`,solid:`💪 @${nick}, solid work`,developing:`🌱 We are still sharpening, @${nick}`}};
  const nextTip={strong:t("next_strong",l),solid:t("next_solid",l),developing:t("next_developing",l)};
  const catLabel=(c)=>({self:t("cat1",l),other:t("cat2",l),field:t("cat3",l)}[c]);
  const filtered=SCENES.filter(s=>s.cat===cat);
  const freeLeft=FREE-sessions;
  const resetAll=()=>{setPhase("scene");setMsgs([]);setTurns(0);setOpp(null);setScene(null);setDebrief(null);setIsCustom(false);setCustomText("");setShowCustomIn(false);setShowCard(false);setShowPhrases(false);};

  const s=(o)=>({padding:"12px 18px",borderRadius:10,border:`1px solid ${bdr}`,background:"transparent",color:"#666",fontSize:13,cursor:"pointer",fontFamily:"inherit",...o});
  const sp=(o)=>({...s({}),background:gold,border:"none",color:"#080810",fontWeight:700,...o});

  return(
    <div style={{minHeight:"100vh",background:bg,color:"#e8e4d9",fontFamily:"'Georgia',serif",display:"flex",flexDirection:"column",alignItems:"center"}}>

      {showFB&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
          <div style={{background:"#13131a",border:`1px solid ${bdr}`,borderRadius:16,padding:28,width:"100%",maxWidth:440}}>
            <div style={{fontSize:16,fontWeight:600,marginBottom:16}}>{t("feedbackTitle",l)}</div>
            {fbSent
              ?<div style={{textAlign:"center",padding:"20px 0",color:gold,fontSize:15}}>{t("feedbackThanks",l)}</div>
              :<>
                <textarea value={fbText} onChange={e=>setFbText(e.target.value)} placeholder={t("feedbackPlaceholder",l)} rows={5}
                  style={{width:"100%",padding:12,background:"rgba(255,255,255,0.04)",border:`1px solid ${bdr}`,borderRadius:8,color:"#e8e4d9",fontSize:13,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.6,boxSizing:"border-box",marginBottom:16}}/>
                <div style={{display:"flex",gap:10}}>
                  <button onClick={()=>setShowFB(false)} style={s({})}>{l==="zh"?"取消":"Cancel"}</button>
                  <button onClick={()=>{if(fbText.trim())setFbSent(true);}} disabled={!fbText.trim()} style={sp({flex:1,opacity:fbText.trim()?1:0.4})}>{t("feedbackSend",l)}</button>
                </div>
              </>
            }
          </div>
        </div>
      )}

      {phase!=="lang"&&phase!=="name"&&(
        <button onClick={()=>{setShowFB(true);setFbSent(false);setFbText("");}}
          style={{position:"fixed",bottom:24,right:16,zIndex:50,padding:"8px 14px",background:"rgba(196,168,130,0.08)",border:`1px solid rgba(196,168,130,0.2)`,borderRadius:20,color:gold,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
          {t("feedbackBtn",l)}
        </button>
      )}

      {phase==="lang"&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"40px 24px",textAlign:"center"}}>
          <div style={{fontSize:11,letterSpacing:"0.4em",color:"#8b7355",textTransform:"uppercase",marginBottom:16}}>RIP IT</div>
          <h1 style={{fontSize:"clamp(48px,12vw,80px)",fontWeight:700,margin:"0 0 6px",letterSpacing:"-0.02em"}}>撕了么</h1>
          <p style={{fontSize:14,color:"#8b7355",margin:"0 0 36px"}}>终结内耗 · 英文职场大杀四方</p>
          <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:14,padding:"20px 24px",maxWidth:360,width:"100%",textAlign:"left",marginBottom:40}}>
            {[t("why1",l),t("why2",l),t("why3",l)].map((w,i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:i<2?12:0}}>
                <div style={{color:gold,fontSize:14,flexShrink:0}}>✦</div>
                <div style={{fontSize:13,color:"#b8b0a0",lineHeight:1.6}}>{w}</div>
              </div>
            ))}
          </div>
          <p style={{color:"#555",fontSize:14,marginBottom:20}}>选择语言 / Choose Language</p>
          <div style={{display:"flex",gap:16}}>
            {[{lv:"zh",label:"中文"},{lv:"en",label:"English"}].map(({lv,label})=>(
              <button key={lv} onClick={()=>{setLang(lv);setPhase("name");}}
                style={{padding:"16px 40px",background:card,border:`1px solid ${bdr}`,borderRadius:12,color:"#e8e4d9",fontSize:16,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {phase==="name"&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"40px 24px",textAlign:"center",maxWidth:400,width:"100%"}}>
          <div style={{fontSize:32,marginBottom:20}}>👋</div>
          <h2 style={{fontSize:22,fontWeight:600,margin:"0 0 8px"}}>{t("enterName",l)}</h2>
          <p style={{color:"#555",fontSize:13,margin:"0 0 32px"}}>{t("nameHint",l)}</p>
          <input value={nickIn} onChange={e=>setNickIn(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&nickIn.trim()){setNick(nickIn.trim());setPhase("scene");}}}
            placeholder={t("namePlaceholder",l)} autoFocus
            style={{width:"100%",padding:"14px 16px",background:card,border:`1px solid ${bdr}`,borderRadius:10,color:"#e8e4d9",fontSize:16,fontFamily:"inherit",outline:"none",marginBottom:16,textAlign:"center",boxSizing:"border-box"}}/>
          <button onClick={()=>{if(nickIn.trim()){setNick(nickIn.trim());setPhase("scene");}}} disabled={!nickIn.trim()}
            style={sp({width:"100%",padding:14,opacity:nickIn.trim()?1:0.4,cursor:nickIn.trim()?"pointer":"not-allowed"})}>
            {t("nameBtn",l)}
          </button>
          {freeLeft>0&&<p style={{marginTop:16,fontSize:12,color:"#444"}}>{l==="zh"?`还有 ${freeLeft} 次免费体验`:`${freeLeft} free sessions remaining`}</p>}
        </div>
      )}

      {phase==="scene"&&(
        <div style={{width:"100%",maxWidth:620,padding:"48px 20px 80px"}}>
          <div style={{textAlign:"center",marginBottom:28}}>
            <h1 style={{fontSize:"clamp(28px,6vw,42px)",fontWeight:700,margin:"0 0 6px",letterSpacing:"-0.02em"}}>{t("brand",l)}</h1>
            <p style={{color:"#8b7355",fontSize:13,margin:"0 0 10px"}}>{t("tagline",l)}</p>
            <p style={{fontSize:12,color:"rgba(196,168,130,0.4)",fontStyle:"italic",margin:"0 0 6px"}}>{t("mantra",l)}</p>
            <p style={{fontSize:11,color:"#444"}}>{t("firstTime",l)}</p>
          </div>
          {freeLeft>0&&<div style={{textAlign:"center",marginBottom:14,fontSize:12,color:"#555"}}>{l==="zh"?`还有 ${freeLeft} 次免费体验`:`${freeLeft} free sessions left`}</div>}
          <div style={{fontSize:11,letterSpacing:"0.25em",color:"#8b7355",textTransform:"uppercase",marginBottom:10}}>{t("selectScene",l)}</div>
          <div style={{display:"flex",gap:8,marginBottom:6}}>
            {CATS.map(c=>(
              <button key={c} onClick={()=>{setCat(c);setShowCustomIn(false);}}
                style={{flex:1,padding:"10px 6px",borderRadius:10,background:cat===c&&!showCustomIn?`rgba(${hexRgb(CC[c])},0.12)`:"transparent",border:`1px solid ${cat===c&&!showCustomIn?CC[c]:bdr}`,color:cat===c&&!showCustomIn?CC[c]:"#555",fontSize:12,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>
                {catLabel(c)}
              </button>
            ))}
          </div>
          <div style={{fontSize:11,color:"#444",marginBottom:14}}>{t(cat==="self"?"catDesc1":cat==="other"?"catDesc2":"catDesc3",l)}</div>
          {!showCustomIn&&(
            <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:14}}>
              {filtered.map(sc=>(
                <button key={sc.id} onClick={()=>{setScene(sc);setIsCustom(false);setPhase("opponent");}}
                  style={{padding:"14px 18px",background:card,border:`1px solid ${bdr}`,borderRadius:12,textAlign:"left",cursor:"pointer",fontFamily:"inherit",color:"#e8e4d9",transition:"all 0.15s"}}
                  onMouseOver={e=>{e.currentTarget.style.borderColor=CC[cat];e.currentTarget.style.background=`rgba(${hexRgb(CC[cat])},0.06)`;}}
                  onMouseOut={e=>{e.currentTarget.style.borderColor=bdr;e.currentTarget.style.background=card;}}>
                  <div style={{fontSize:10,color:CC[cat],marginBottom:2}}>{l==="zh"?sc.num:sc.numEn}</div>
                  <div style={{fontSize:14,fontWeight:600}}>{l==="zh"?sc.zh:sc.en}</div>
                  <div style={{fontSize:11,color:"#555",marginTop:3,lineHeight:1.4}}>{(l==="zh"?sc.what.zh:sc.what.en).slice(0,60)}...</div>
                </button>
              ))}
            </div>
          )}
          {!showCustomIn
            ?<>
              <div style={{textAlign:"center",padding:"14px 0 6px",fontSize:11,color:"#555",fontStyle:"italic"}}>✦ {l==="zh"?"更多场景持续更新中 · 职场谈判 · 跨文化沟通 · 日常英文":"More scenes coming · Negotiation · Cross-culture · Daily English"}</div>
              <button onClick={()=>setShowCustomIn(true)}
                style={{width:"100%",padding:"14px 18px",background:"transparent",border:`1px dashed rgba(196,168,130,0.3)`,borderRadius:12,textAlign:"left",cursor:"pointer",fontFamily:"inherit",color:gold}}>
                <div style={{fontSize:13,fontWeight:600}}>{t("customScene",l)}</div>
                <div style={{fontSize:11,color:"#8b7355",marginTop:3}}>{t("customSceneDesc",l)}</div>
              </button>
            </>
            :<div style={{background:card,border:`1px solid rgba(196,168,130,0.3)`,borderRadius:14,padding:20}}>
              <div style={{fontSize:13,fontWeight:600,color:gold,marginBottom:12}}>{t("customSceneTitle",l)}</div>
              <textarea value={customText} onChange={e=>setCustomText(e.target.value)} placeholder={t("customPlaceholder",l)} rows={4}
                style={{width:"100%",padding:12,background:"rgba(255,255,255,0.03)",border:`1px solid ${bdr}`,borderRadius:8,color:"#e8e4d9",fontSize:13,fontFamily:"inherit",resize:"none",outline:"none",lineHeight:1.6,boxSizing:"border-box",marginBottom:12}}/>
              <div style={{display:"flex",gap:8}}>
                <button onClick={()=>setShowCustomIn(false)} style={s({})}>{t("back",l)}</button>
                <button onClick={()=>{if(customText.trim()){setScene(null);setIsCustom(true);setPhase("opponent");}}} disabled={!customText.trim()}
                  style={sp({flex:1,opacity:customText.trim()?1:0.4,cursor:customText.trim()?"pointer":"not-allowed"})}>
                  {t("customBtn",l)}
                </button>
              </div>
            </div>
          }
        </div>
      )}

      {phase==="missionCard"&&scene&&(
        <div style={{width:"100%",maxWidth:600,padding:"48px 20px 40px"}}>
          <button onClick={()=>setPhase("opponent")} style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:13,marginBottom:24,fontFamily:"inherit"}}>{t("back",l)}</button>
          <div style={{fontSize:10,color:CC[scene.cat],letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:4}}>{l==="zh"?scene.num:scene.numEn}</div>
          <h2 style={{fontSize:20,fontWeight:700,margin:"0 0 24px"}}>{l==="zh"?scene.zh:scene.en}</h2>
          {[{label:t("missionRole",l),content:l==="zh"?scene.role.zh:scene.role.en},{label:t("missionWhat",l),content:l==="zh"?scene.what.zh:scene.what.en}].map((item,i)=>(
            <div key={i} style={{background:card,border:`1px solid ${bdr}`,borderRadius:12,padding:"18px 20px",marginBottom:12}}>
              <div style={{fontSize:10,color:gold,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:8}}>{item.label}</div>
              <p style={{fontSize:13,color:"#c8c0b0",lineHeight:1.75,margin:0}}>{item.content}</p>
            </div>
          ))}
          <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:12,padding:"18px 20px",marginBottom:12}}>
            <div style={{fontSize:10,color:gold,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:12}}>{t("missionGoals",l)}</div>
            {(l==="zh"?scene.goals.zh:scene.goals.en).map((g,i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:i<2?10:0,alignItems:"flex-start"}}>
                <div style={{width:18,height:18,borderRadius:"50%",background:`rgba(${hexRgb(CC[scene.cat])},0.15)`,border:`1px solid ${CC[scene.cat]}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:CC[scene.cat],flexShrink:0,marginTop:2}}>{i+1}</div>
                <div style={{fontSize:13,color:"#c8c0b0",lineHeight:1.6}}>{g}</div>
              </div>
            ))}
          </div>
          <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:12,padding:"18px 20px",marginBottom:24}}>
            <div style={{fontSize:10,color:gold,letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:12}}>{t("missionPhrases",l)}</div>
            {scene.phrases.map((p,i)=>(
              <div key={i} style={{marginBottom:i<scene.phrases.length-1?12:0}}>
                <div style={{fontSize:13,color:gold,fontStyle:"italic",marginBottom:3}}>{p}</div>
                {l==="zh"&&<div style={{fontSize:11,color:"#8b7355"}}>{scene.phrasesZh[i]}</div>}
              </div>
            ))}
          </div>
          <button onClick={startSession} style={sp({width:"100%",padding:15})}>{t("startNow",l)}</button>
        </div>
      )}

      {phase==="opponent"&&(
        <div style={{width:"100%",maxWidth:620,padding:"48px 20px 40px"}}>
          <button onClick={()=>{setPhase("scene");setShowCustomIn(isCustom);}} style={{background:"none",border:"none",color:"#555",cursor:"pointer",fontSize:13,marginBottom:24,fontFamily:"inherit"}}>{t("back",l)}</button>
          <div style={{fontSize:11,color:gold,marginBottom:6,fontStyle:"italic"}}>{isCustom?(l==="zh"?"你的战场":"Your Scene"):(l==="zh"?scene?.zh:scene?.en)}</div>
          <h2 style={{fontSize:20,fontWeight:600,margin:"0 0 24px"}}>{t("selectOpponent",l)}</h2>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
            {OPPONENTS.map(o=>(
              <button key={o.id} onClick={()=>setOpp(o)}
                style={{padding:"18px 14px",textAlign:"left",cursor:"pointer",fontFamily:"inherit",background:opp?.id===o.id?`rgba(${hexRgb(o.color)},0.1)`:card,border:`1px solid ${opp?.id===o.id?o.color:bdr}`,borderRadius:14,color:"#e8e4d9",transition:"all 0.15s"}}>
                <div style={{width:34,height:34,borderRadius:"50%",background:`rgba(${hexRgb(o.color)},0.15)`,border:`1px solid ${o.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,fontWeight:700,color:o.color,marginBottom:10}}>{o.avatar}</div>
                <div style={{fontSize:14,fontWeight:600,marginBottom:3}}>{o.name}</div>
                <div style={{fontSize:11,color:o.color,marginBottom:5}}>{l==="zh"?o.zh:o.en}</div>
                <div style={{fontSize:11,color:"#555",lineHeight:1.5}}>{o.desc[l]}</div>
              </button>
            ))}
          </div>
          <div style={{fontSize:11,letterSpacing:"0.25em",color:"#8b7355",textTransform:"uppercase",marginBottom:10}}>{t("selectDifficulty",l)}</div>
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            {["easy","medium","hard"].map(d=>(
              <button key={d} onClick={()=>setDiff(d)}
                style={{flex:1,padding:10,background:diff===d?"rgba(255,255,255,0.05)":"transparent",border:`1px solid ${diff===d?DIFF[d].color:bdr}`,borderRadius:10,color:diff===d?DIFF[d].color:"#555",fontSize:13,cursor:"pointer",fontFamily:"inherit"}}>
                {t(d,l)}
              </button>
            ))}
          </div>
          {!isCustom&&scene&&opp&&(
            <button onClick={()=>setPhase("missionCard")}
              style={{width:"100%",padding:12,background:"transparent",border:`1px solid rgba(196,168,130,0.25)`,borderRadius:10,color:gold,fontSize:13,cursor:"pointer",fontFamily:"inherit",marginBottom:10}}>
              📋 {t("missionCardTitle",l)} · {l==="zh"?scene.num:scene.numEn}
            </button>
          )}
          <button onClick={()=>{if(opp){if(!isCustom&&scene)setPhase("missionCard");else startSession();}}} disabled={!opp}
            style={sp({width:"100%",padding:15,opacity:opp?1:0.4,cursor:opp?"pointer":"not-allowed"})}>
            {!opp?t("noOpp",l):isCustom?t("startNow",l):t("viewCard",l)}
          </button>
        </div>
      )}

      {phase==="chat"&&opp&&(
        <div style={{width:"100%",maxWidth:640,display:"flex",flexDirection:"column",height:"100vh"}}>
          <div style={{padding:"12px 16px",borderBottom:`1px solid ${bdr}`,display:"flex",alignItems:"center",justifyContent:"space-between",background:bg,position:"sticky",top:0,zIndex:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:36,height:36,borderRadius:"50%",flexShrink:0,background:isSpeaking?`rgba(${hexRgb(opp.color)},0.2)`:card,border:`1px solid ${isSpeaking?opp.color:bdr}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:700,color:opp.color,transition:"all 0.3s"}}>
                {isSpeaking?"🔊":opp.avatar}
              </div>
              <div style={{minWidth:0}}>
                <div style={{fontSize:12,fontWeight:600,whiteSpace:"nowrap"}}>@{nick} <span style={{color:"#444"}}>vs.</span> <span style={{color:opp.color}}>{opp.name}</span></div>
                <div style={{fontSize:10,color:"#444",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{isSpeaking?t("speakingOpp",l):isCustom?(l==="zh"?"自定义场景":"Custom Scene"):(l==="zh"?scene?.zh:scene?.en)}</div>
              </div>
            </div>
            <div style={{display:"flex",gap:5,flexShrink:0,marginLeft:8}}>
              {!isCustom&&scene&&(
                <button onClick={()=>setShowCard(!showCard)}
                  style={{padding:"5px 8px",background:showCard?`rgba(${hexRgb(gold)},0.1)`:"transparent",border:`1px solid ${showCard?gold:bdr}`,borderRadius:6,color:showCard?gold:"#666",fontSize:10,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
                  {t("cardBtn",l)}
                </button>
              )}
              {!isCustom&&<button onClick={()=>setShowPhrases(!showPhrases)}
                style={{padding:"5px 8px",background:"transparent",border:`1px solid ${bdr}`,borderRadius:6,color:"#666",fontSize:10,cursor:"pointer",fontFamily:"inherit",whiteSpace:"nowrap"}}>
                {showPhrases?t("hideHint",l):t("hint",l)}
              </button>}
              <button onClick={endSession}
                style={{padding:"5px 8px",background:"transparent",border:`1px solid ${bdr}`,borderRadius:6,color:"#666",fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>
                {t("end",l)}
              </button>
            </div>
          </div>

          {showCard&&!isCustom&&scene&&(
            <div style={{padding:"12px 16px",background:"rgba(196,168,130,0.04)",borderBottom:`1px solid ${bdr}`}}>
              <div style={{fontSize:11,color:gold,fontWeight:600,marginBottom:6}}>{l==="zh"?scene.num:scene.numEn} · {l==="zh"?scene.zh:scene.en}</div>
              <div style={{fontSize:11,color:"#8b7355",marginBottom:4}}>{l==="zh"?"你是：":"You are:"} {l==="zh"?scene.role.zh:scene.role.en}</div>
              <div style={{fontSize:11,color:"#555",lineHeight:1.55,marginBottom:8}}>{l==="zh"?scene.what.zh:scene.what.en}</div>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {(l==="zh"?scene.goals.zh:scene.goals.en).map((g,i)=>(
                  <div key={i} style={{fontSize:10,color:CC[scene.cat],background:`rgba(${hexRgb(CC[scene.cat])},0.08)`,borderRadius:4,padding:"2px 8px"}}>{i+1}. {g}</div>
                ))}
              </div>
            </div>
          )}

          {showPhrases&&!isCustom&&scene&&(
            <div style={{padding:"10px 16px",background:"rgba(196,168,130,0.04)",borderBottom:`1px solid ${bdr}`}}>
              {scene.phrases.map((p,i)=>(
                <div key={i} style={{marginBottom:i<scene.phrases.length-1?8:0}}>
                  <div style={{fontSize:11,color:gold,fontStyle:"italic"}}>{p}</div>
                  {l==="zh"&&<div style={{fontSize:10,color:"#8b7355"}}>{scene.phrasesZh[i]}</div>}
                </div>
              ))}
            </div>
          )}

          <div style={{flex:1,overflowY:"auto",padding:"18px 16px",display:"flex",flexDirection:"column",gap:12}}>
            {msgs.map((m,i)=>(
              <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
                <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.role==="user"?"rgba(196,168,130,0.1)":card,border:`1px solid ${m.role==="user"?"rgba(196,168,130,0.25)":bdr}`,fontSize:14,lineHeight:1.65,color:m.role==="user"?"#e8d8b8":"#c8c0b0"}}>
                  {m.role==="opponent"&&<div style={{fontSize:9,color:opp.color,marginBottom:4,letterSpacing:"0.15em"}}>{opp.name.toUpperCase()}</div>}
                  {m.text}
                </div>
              </div>
            ))}
            {loading&&(
              <div style={{display:"flex"}}>
                <div style={{padding:"10px 14px",background:card,border:`1px solid ${bdr}`,borderRadius:"14px 14px 14px 4px",display:"flex",gap:4,alignItems:"center"}}>
                  {[0,1,2].map(i=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:"#555",animation:`pulse 1.2s ease-in-out ${i*0.2}s infinite`}}/>)}
                </div>
              </div>
            )}
            {isListening&&transcript&&(
              <div style={{display:"flex",justifyContent:"flex-end"}}>
                <div style={{maxWidth:"80%",padding:"10px 14px",borderRadius:"14px 14px 4px 14px",background:"rgba(196,168,130,0.05)",border:`1px dashed rgba(196,168,130,0.25)`,fontSize:13,color:"#8b7355",fontStyle:"italic"}}>{transcript}</div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          <div style={{padding:"3px 16px",display:"flex",justifyContent:"flex-end",gap:4}}>
            {Array.from({length:8}).map((_,i)=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:i<turns?opp.color:bdr,transition:"background 0.3s"}}/>)}
          </div>

          <div style={{padding:"12px 16px 22px",borderTop:`1px solid ${bdr}`,background:bg}}>
            {micErr&&<div style={{textAlign:"center",fontSize:12,color:"#f87171",marginBottom:8}}>{micErr}</div>}
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <button onMouseDown={startListening} onMouseUp={stopListening}
                onTouchStart={e=>{e.preventDefault();startListening();}} onTouchEnd={e=>{e.preventDefault();stopListening();}}
                disabled={loading||isSpeaking}
                style={{width:64,height:64,borderRadius:"50%",background:isListening?`rgba(${hexRgb(opp.color)},0.2)`:loading||isSpeaking?"rgba(255,255,255,0.02)":card,border:`2px solid ${isListening?opp.color:loading||isSpeaking?bdr:"rgba(255,255,255,0.1)"}`,cursor:loading||isSpeaking?"not-allowed":"pointer",fontSize:24,display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s",boxShadow:isListening?`0 0 18px rgba(${hexRgb(opp.color)},0.3)`:"none"}}>
                {isListening?"🔴":isSpeaking?"🔊":loading?"⏳":"🎙"}
              </button>
              <div style={{fontSize:11,color:"#444",textAlign:"center"}}>{isListening?t("listening",l):isSpeaking?t("speakingOpp",l):loading?t("thinking",l):t("prompt",l)}</div>
              {isSpeaking&&<button onClick={()=>{synthRef.current.cancel();setIsSpeaking(false);}} style={s({fontSize:11,padding:"4px 12px"})}>{t("interrupt",l)}</button>}
            </div>
          </div>
        </div>
      )}

      {phase==="debrief"&&opp&&(
        <div style={{width:"100%",maxWidth:560,padding:"48px 22px 80px"}}>
          {debriefLoading
            ?<div style={{textAlign:"center",padding:"80px 20px",color:"#555"}}><div style={{fontSize:32,marginBottom:16}}>⏳</div><div style={{fontSize:14}}>{t("analyzing",l)}</div></div>
            :debrief
              ?<>
                <div style={{background:card,border:`1px solid ${scoreColor}33`,borderRadius:16,padding:24,marginBottom:14}}>
                  <div style={{fontSize:16,fontWeight:700,color:scoreColor,marginBottom:4}}>{scoreLabel[l][debrief.score]}</div>
                  <div style={{fontSize:13,color:"#b8b0a0",fontStyle:"italic",marginBottom:14}}>{l==="zh"?debrief.headline_zh:debrief.headline_en}</div>
                  <div style={{borderTop:`1px solid ${bdr}`,paddingTop:14,display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
                    <div>
                      <div style={{fontSize:10,color:"#4ade80",letterSpacing:"0.12em",marginBottom:6}}>✓ {l==="zh"?"做对了":"WHAT WORKED"}</div>
                      <div style={{fontSize:12,color:"#9a9080",lineHeight:1.65}}>{l==="zh"?debrief.what_worked_zh:debrief.what_worked_en}</div>
                    </div>
                    <div>
                      <div style={{fontSize:10,color:"#ffb800",letterSpacing:"0.12em",marginBottom:6}}>→ {l==="zh"?"下次试试":"GROW NEXT"}</div>
                      <div style={{fontSize:12,color:"#9a9080",lineHeight:1.65}}>{l==="zh"?debrief.growth_edge_zh:debrief.growth_edge_en}</div>
                    </div>
                  </div>
                </div>

                <div style={{background:"linear-gradient(135deg,rgba(196,168,130,0.08) 0%,rgba(124,106,255,0.06) 100%)",border:`1px solid rgba(196,168,130,0.2)`,borderRadius:16,padding:"22px",marginBottom:14}}>
                  <div style={{fontSize:10,letterSpacing:"0.2em",color:"#8b7355",textTransform:"uppercase",marginBottom:10}}>{t("bookInsight",l)}</div>
                  {bookInfo&&<div style={{fontSize:12,color:gold,marginBottom:12,fontWeight:600}}>《{bookInfo.title}》— {bookInfo.author}</div>}
                  <div style={{background:"rgba(0,0,0,0.2)",borderRadius:10,padding:"14px 16px",marginBottom:14,borderLeft:`3px solid ${gold}`}}>
                    <div style={{fontSize:13,color:"#e8d8b8",lineHeight:1.7,marginBottom:6,fontStyle:"italic"}}>{debrief.book_quote_zh}</div>
                    <div style={{fontSize:12,color:"#8b7355",lineHeight:1.6,fontStyle:"italic"}}>{debrief.book_quote_en}</div>
                  </div>
                  <p style={{fontSize:13,color:"#b8b0a0",lineHeight:1.75,margin:"0 0 14px"}}>{l==="zh"?debrief.book_insight_zh:debrief.book_insight_en}</p>
                  <div style={{background:"rgba(196,168,130,0.08)",borderRadius:10,padding:"12px 14px"}}>
                    <div style={{fontSize:10,color:"#8b7355",letterSpacing:"0.12em",marginBottom:6}}>{l==="zh"?"💬 下次直接用这句":"💬 USE THIS NEXT TIME"}</div>
                    <div style={{fontSize:13,color:gold,fontStyle:"italic",marginBottom:4}}>{debrief.power_phrase}</div>
                    <div style={{fontSize:11,color:"#8b7355"}}>{debrief.power_phrase_zh}</div>
                  </div>
                  <div style={{marginTop:16,paddingTop:14,borderTop:`1px solid rgba(196,168,130,0.1)`,textAlign:"center"}}>
                    <div style={{fontSize:11,color:"#555",marginBottom:2}}>{t("screenshotTitle",l)}</div>
                    <div style={{fontSize:11,color:"#444"}}>{t("screenshotHint",l)}</div>
                  </div>
                </div>

                {!isCustom&&scene&&(
                  <div style={{background:card,border:`1px solid ${bdr}`,borderRadius:14,padding:"18px 20px",marginBottom:14}}>
                    <div style={{fontSize:10,letterSpacing:"0.2em",color:"#8b7355",textTransform:"uppercase",marginBottom:14}}>{t("keyMoves",l)}</div>
                    {(l==="zh"?scene.keyMoves.zh:scene.keyMoves.en).map((m,i)=>(
                      <div key={i} style={{padding:"8px 0",borderBottom:i<2?`1px solid ${bdr}`:"none",display:"flex",gap:10,alignItems:"flex-start"}}>
                        <div style={{width:18,height:18,borderRadius:"50%",background:`rgba(${hexRgb(opp.color)},0.15)`,border:`1px solid ${opp.color}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,color:opp.color,flexShrink:0,marginTop:1}}>{i+1}</div>
                        <div style={{fontSize:12,color:"#c8c0b0",lineHeight:1.5}}>{m}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div style={{background:`rgba(${hexRgb(opp.color)},0.06)`,border:`1px solid rgba(${hexRgb(opp.color)},0.15)`,borderRadius:12,padding:"14px 16px",marginBottom:24}}>
                  <div style={{fontSize:10,color:opp.color,letterSpacing:"0.12em",marginBottom:6}}>→ {l==="zh"?"下次建议":"WHAT'S NEXT"}</div>
                  <div style={{fontSize:13,color:"#9a9080",lineHeight:1.6}}>{nextTip[debrief.score]}</div>
                </div>
              </>
              :<div style={{textAlign:"center",padding:"40px",color:"#555"}}>{l==="zh"?"无法生成复盘，请重试":"Unable to generate debrief, please retry"}</div>
          }
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            <button onClick={resetAll} style={s({})}>{t("newScene",l)}</button>
            <button onClick={()=>{setPhase("opponent");setMsgs([]);setTurns(0);setDebrief(null);}} style={s({})}>{t("changeDiff",l)}</button>
            <button onClick={startSession} style={sp({})}>{t("again",l)}</button>
          </div>
        </div>
      )}

      {phase==="paywall"&&(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"40px 24px",textAlign:"center",maxWidth:480,width:"100%"}}>
          <div style={{fontSize:40,marginBottom:16}}>🔓</div>
          <h2 style={{fontSize:24,fontWeight:700,margin:"0 0 8px"}}>{t("paywallTitle",l)}</h2>
          <p style={{color:"#8b7355",fontSize:14,margin:"0 0 6px"}}>{t("paywallSub",l)}</p>
          <p style={{color:"#555",fontSize:12,margin:"0 0 28px",fontStyle:"italic"}}>{l==="zh"?"平均每天不到6毛钱":"Less than $0.20 a day"}</p>
          <div style={{background:card,border:`1px solid rgba(196,168,130,0.3)`,borderRadius:16,padding:28,width:"100%",marginBottom:16}}>
            <div style={{fontSize:26,fontWeight:700,color:gold,marginBottom:4}}>{t("paywallPrice",l)}</div>
            <div style={{fontSize:12,color:"#555",marginBottom:20}}>{l==="zh"?"22个职场场景 · 4个AI对手 · 专属智慧金句卡":"22 scenes · 4 AI opponents · Personalised wisdom cards"}</div>
            <div style={{background:"rgba(7,193,96,0.08)",border:"1px solid rgba(7,193,96,0.2)",borderRadius:12,padding:16,marginBottom:12}}>
              <div style={{fontSize:13,fontWeight:600,color:"#07c160",marginBottom:8}}>💚 {l==="zh"?"微信扫码付款":"WeChat Pay"}</div>
              <img src="data:image/jpeg;base64,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AIUJpXP/AFENW/8Ak2gD8Rv+DIj/AJNX+N//AGNWnf8ApDXvf/B6XqF/pv8AwTK+Hk2nTvbufidp6lo2KnH9i6xxwRxX9HP7HX7Af7IX7AnhvWfCH7IXgq28Fabr9zHd38FtPczrNPEnlo5NzLKRheOCBWx+1/8AsR/ss/t5fDrT/hN+1t4Rt/Gfh7S9Sj1e1sria4gVL2KKWBJQ1tLCxIinkXBbb83TpQB/hrt4r8Tj/mI3P/f5/wDGu++E/irxM3xQ8Nq2o3RH9qWf/LV/+ey+9f660f8Awbff8ESyP+SC6WenXUNW9P8Ar9q/p/8Awbn/APBFjRtRt9W0z4D6XFcWsiSxOL/VfldCGU83uOCBQB+2CjHFPqKI/Lg84qWgAooooAKKKKAP/9D+/iiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAP/R/v4ooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD/2Q==" style={{width:150,height:150,borderRadius:8,margin:"0 auto",display:"block"}}/>
            </div>
                        <div style={{fontSize:13,color:gold,fontWeight:600,marginBottom:12}}>{t("paywallContact",l)}</div>
            <div style={{background:"rgba(196,168,130,0.06)",border:`1px solid rgba(196,168,130,0.15)`,borderRadius:10,padding:"12px 16px",marginTop:4}}>
              <div style={{fontSize:12,color:"#c8c0b0",lineHeight:1.7}}>{l==="zh"?"开通后即可加入撕了么英文职场精进社群，更多独家资料和福利等你来拿 🎁":"Join our English workplace practice community after activation — exclusive resources and more await 🎁"}</div>
            </div>
          </div>
          <p style={{fontSize:12,color:"#444",margin:"16px 0 0",fontStyle:"italic"}}>{l==="zh"?"终结内耗 · 英文职场大杀四方":"Stop Holding Back. Start Winning."}</p>
        </div>
      )}

      <div style={{position:"fixed",right:10,bottom:8,fontSize:10,color:"#666",opacity:0.7,pointerEvents:"none"}}>
        {BUILD_MARKER}
      </div>
      <style>{`@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}*{box-sizing:border-box}::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:#2a2a3a;border-radius:2px}input::placeholder,textarea::placeholder{color:#444}`}</style>
    </div>
  );
}
