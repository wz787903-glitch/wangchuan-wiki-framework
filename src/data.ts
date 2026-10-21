// All example names and content below are fictional, authored for this demo.
export type Entry = {
    id: string;
    name: string;
    category: string;
    summary: string;
    body: string[];
};
export const entries: Entry[] = [
    { id: 'archive', name: '青灯资料馆', category: '地点', summary: '保存小镇公开资料的地方。', body: ['资料馆按地点、工具和人物整理条目。每条资料保留来源和修订说明，方便读者核对。', '这是虚构条目，用于演示详情页。接入自己的资料时，请同时补充来源与使用授权。'] },
    { id: 'workshop', name: '纸鸢工坊', category: '地点', summary: '镇民交换制作经验的工坊。', body: ['工坊提供材料清单和制作记录。读者可以先收藏感兴趣的条目，再按自己的进度阅读。'] },
    { id: 'notebook', name: '远行笔记', category: '工具', summary: '记录路线、物资和沿途见闻。', body: ['笔记可以按日期分段。记录一次修改时，写清改了哪里、依据是什么，比只写“已更新”更有帮助。'] },
    { id: 'guide', name: '引路人', category: '人物', summary: '为第一次到访的旅人介绍小镇。', body: ['引路人熟悉资料馆和工坊的位置。这一虚构角色用于演示分类筛选、收藏和小队选择。'] },
    { id: 'recorder', name: '记录员', category: '人物', summary: '整理大家带回的记录。', body: ['记录员负责把零散的见闻整理成可检索的资料。示例不包含任何现有游戏的角色设定。'] },
    { id: 'artisan', name: '修补匠', category: '人物', summary: '检查工具并协助维护。', body: ['修补匠会检查出发前的工具清单。这里没有角色数值、技能效果或伤害计算。'] }
];
export type Question = {
    id: string;
    prompt: string;
    options: string[];
    answer: number;
    explanation: string;
};
export type Lesson = {
    id: string;
    title: string;
    paragraphs: string[];
};
export type Chapter = {
    id: string;
    title: string;
    summary: string;
    lessons: Lesson[];
    questions: Question[];
};
export const chapters: Chapter[] = [
    { id: 'start', title: '基础篇', summary: '认识检索、收藏和资料来源。', lessons: [
            { id: 'find', title: '先找到资料', paragraphs: ['在资料页输入名称或关键词，也可以先按分类筛选。点击卡片进入详情，返回列表后可以继续筛选。', '卡片上的“收藏”会把条目保存在当前浏览器。换设备或清除浏览器数据后，这些记录不会自动同步。'] },
            { id: 'source', title: '阅读来源', paragraphs: ['阅读攻略时，先确认内容适用的范围，再看来源和修订日期。转载他人的文字或素材前，需要确认授权。', '这份框架只提供虚构示例。把自己的资料换进来时，应一并维护来源，避免正文更新后说明仍停留在旧版。'] }
        ], questions: [
            { id: 'q-find', prompt: '只想查看资料中的地点，怎样更快找到？', options: ['切换到“地点”分类', '重复刷新页面', '清空收藏夹'], answer: 0, explanation: '分类筛选可以缩小检索范围。' },
            { id: 'q-save', prompt: '清除浏览器数据后，本地收藏会怎样？', options: ['自动恢复', '可能丢失', '变成公开投稿'], answer: 1, explanation: '本演示使用浏览器本地存储，不提供账号同步。' },
            { id: 'q-source', prompt: '替换演示资料时，还需要一并维护什么？', options: ['只改标题', '删掉所有说明', '来源和使用授权'], answer: 2, explanation: '替换内容时需要核对来源和授权。' }
        ] },
    { id: 'contribute', title: '共创篇', summary: '把修改写清楚，保留可核对的依据。', lessons: [
            { id: 'draft', title: '写一份可核对的建议', paragraphs: ['建议至少包括标题、正文和依据。指出具体问题，再写建议改成什么，方便维护者核对。', '本演示的草稿只保存在当前浏览器。它不会发送给站长，也不会显示为“已提交审核”。正式社区需要自行接入登录、通知和审核服务。'] }
        ], questions: [
            { id: 'q-draft', prompt: '在本演示中保存草稿后，谁能看到？', options: ['全站读者', '维护者的后台', '当前浏览器的使用者'], answer: 2, explanation: '演示没有远程投稿服务，保存草稿不等于提交审核。' },
            { id: 'q-feedback', prompt: '哪种修改建议更方便核对？', options: ['这个不好，重做', '写明条目、问题、建议与依据', '只发一个标点'], answer: 1, explanation: '具体位置、修改内容和依据可以减少来回确认。' },
            { id: 'q-license', prompt: '准备添加他人的插画，应该先做什么？', options: ['确认使用授权', '去掉署名', '压缩文件'], answer: 0, explanation: '技术上可以显示图片，不代表已经获得公开使用的权利。' }
        ] }
];
export const members = [
    { id: 'guide', name: '引路人', role: '带路' }, { id: 'recorder', name: '记录员', role: '记录' },
    { id: 'artisan', name: '修补匠', role: '维护' }, { id: 'courier', name: '信使', role: '联络' },
    { id: 'observer', name: '观察员', role: '记录' }, { id: 'keeper', name: '保管员', role: '维护' },
    { id: 'visitor', name: '访客', role: '联络' }
];
export const defaultTeam = ['guide', 'recorder', 'artisan', 'courier'];
