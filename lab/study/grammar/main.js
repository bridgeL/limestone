let data = [
    "1.{As audiences grew}, {so did the places {where films were shown}, {finishing up with the ‘great picture palaces’ of the 1920s, which rivaled, and occasionally superseded, theatres and opera-houses in terms of opulence and splendour}}.",
    "2. It was {above all} the French, {followed by the Americans,} {{who were the most passionate exporters of the new invention}, {helping to start cinema in China, Japan, Latin America and Russia.}}",
    "3.{{In terms of artistic development} it was again {the French and the Americans} {who took the lead}}, {though {in the years before the First World War,} {Italy, Denmark and Russia} also played a part}.",
    "4.{The rest {of the world} survived {partly by learning from Hollywood} and {partly because audiences continued to exist {for a product {which corresponded to needs {which Hollywood could not supply}}}}}.",
    "5.{As well as popular audiences}, {there were also {increasing} audiences {for films {which were artistically more adventurous} or {which dealt with the issues in the outer world}}}."
]

let nanoid = (t = 21) => {
    let e = "", r = crypto.getRandomValues(new Uint8Array(t));
    for (; t--;) {
        let n = 63 & r[t];
        e += n < 36 ? n.toString(36) :
            n < 62 ? (n - 26).toString(36).toUpperCase() :
                n < 63 ? "_" : "-"
    }
    return e
};

class Analyzer {
    constructor(sentence) {
        this.cs = [
            "black",
            "red",
            "blue",
            "green",
            "brown",
            "purple",
            "orange",
        ];
        this.set_sentence(sentence);
    }

    set_sentence(sentence) {
        sentence = this.check(sentence);
        // 生成树结构
        this.tree = this.build_base(sentence);
        this.father_obj = this.father_regst(this.tree);
        this.output = this.flatten(this.tree, this.father_obj);
    }

    check(sentence) {
        // 校验该sentence并尝试修复
        let cnt = 0;
        let left = 0;
        for (let i = 0; i < sentence.length; i++) {
            let s = sentence[i];
            if (s == "{") cnt++;
            if (s == "}") cnt--;
            if (cnt < 0) {
                left -= cnt;
                cnt = 0;
            }
        }
        for (let i = 0; i < left; i++) sentence = "{" + sentence;
        for (let i = 0; i < cnt; i++) sentence = sentence + "}";
        console.log('修复后', sentence);
        return sentence;
    }

    // 输入句子，生成一棵树
    // 中间结点、叶子结点
    // id、children、string、father_id
    build_base(sentence) {
        let tree = { id: nanoid(), children: [], string: "", father_id: "" };
        let node = tree;
        let i,
            start = 0;
        let stack = [];
        for (i = 0; i < sentence.length; i++) {
            let s = sentence[i];
            if (s == "{" || s == "}") {
                // 将之前的字符串分析拆解为叶子结点
                let before = sentence.slice(start, i);
                let strs = before.split(/\s/g);

                // 将单词一个个加入父亲结点
                strs.forEach((str) => {
                    // 删除首尾空格
                    str = str.replace(/(^\s*)|(\s*$)/g, "");
                    // 排除空字符串
                    if (str) {
                        let leaf = {
                            id: nanoid(),
                            children: [],
                            string: str,
                            father_id: node.id,
                        };
                        // 添加到父亲结点上
                        node.children.push(leaf);
                    }
                });

                // 递归
                if (s == "{") {
                    start = i + 1;
                    stack.push(node);
                    let temp = {
                        id: nanoid(),
                        children: [],
                        string: "",
                        father_id: node.id,
                    };
                    node.children.push(temp);
                    node = temp;
                    continue;
                } else {
                    // 返回上一层
                    start = i + 1;
                    node = stack.pop();
                }
            }
        }

        // 最终收尾
        let before = sentence.slice(start, i);
        let strs = before.split(/\s/g);

        // 将单词一个个加入父亲结点
        strs.forEach((str) => {
            // 删除首尾空格
            str = str.replace(/(^\s*)|(\s*$)/g, "");
            // 排除空字符串
            if (str) {
                let leaf = {
                    id: nanoid(),
                    children: [],
                    string: str,
                    father_id: tree.id,
                };
                // 添加到父亲结点上
                node.children.push(leaf);
            }
        });

        // 只有根结点能跑到这里
        return tree;
    }

    // 深度优先遍历
    dfs(tree, func) {
        let node;
        let stack = [];
        let nodes = [tree],
            i = 0;
        while (stack.length || i < nodes.length) {
            // 本层轮空，恢复上层现场
            if (i >= nodes.length) {
                [nodes, i] = stack.pop();
                // 校验上层是否轮空
                continue;
            }
            // 取出下一个目标
            node = nodes[i];
            // 先根遍历
            let flag = func(node);
            // flag = 1 立即返回上层
            // flag = 2 不立即返回上层，但拒绝遍历孩子

            if (flag == 0) {
                // 添加孩子
                if (node.children.length > 0) {
                    // 保护现场
                    stack.push([nodes, i + 1]);
                    // 更换结点
                    nodes = node.children;
                    i = 0;
                } else i++;
            } else if (flag == 1) i = nodes.length;
            else i++;
        }
    }

    // 查找父亲
    find_father_id(tree, id) {
        let fid;

        // 查找fid
        this.dfs(tree, function (node) {
            if (node.id == id) fid = node.father_id;
            return 0;
        });

        return fid;
    }

    // 注册所有父亲结点的颜色、折叠、高亮指示
    father_regst(tree) {
        let father_obj = {};
        let cs = this.cs;
        let cnt = 0;
        // 深度优先遍历
        this.dfs(tree, function (node) {
            // 只获取中间结点
            if (!node.string) {
                father_obj[node.id] = {
                    // 获取颜色方式：
                    // 随机抽取
                    // color: cs[Math.floor(Math.random() * 10)],
                    // 顺序获得
                    color: cs[cnt++ % cs.length],
                    fold: false,
                    focus: false,
                };
            }
            return 0;
        });
        return father_obj;
    }

    // 生成一维数组
    flatten(tree, father_obj) {
        let flat_nodes = [];

        // 深度优先遍历
        this.dfs(tree, function (node) {
            if (!node.string) {
                let id = node.id;
                let color = father_obj[id].color;
                let line = father_obj[id].focus ? "underline" : "none";
                if (father_obj[id].fold) {
                    let item = {
                        id: id,
                        color: color,
                        content: "...",
                        line: line,
                    };
                    flat_nodes.push(item);
                    // 不遍历孩子
                    return 2;
                }
            }
            else {
                let fid = node.father_id;
                let color = father_obj[fid].color;
                let line = father_obj[fid].focus ? "underline" : "none";

                let item = {
                    id: node.id,
                    color: color,
                    content: node.string,
                    line: line,
                };
                flat_nodes.push(item);

            }
            return 0;
        });
        return flat_nodes;
    }

    // 鼠标悬浮
    hoverItem(id, val) {
        console.log(id, val);
        let fid;

        // 传进来...结点的id
        if (Object.keys(this.father_obj).indexOf(id) != -1) fid = id;
        // 搜索fid
        else fid = this.find_father_id(this.tree, id);

        // 修改focus
        // 避免不必要的开销
        if (this.father_obj[fid].focus != val) {
            this.father_obj[fid].focus = val;
            // 重新生成output
            this.output = this.flatten(this.tree, this.father_obj);
        }
    }

    // 鼠标点击
    clickItem(id) {
        console.log(id);
        // 传进来...结点的id
        if (Object.keys(this.father_obj).indexOf(id) != -1) this.father_obj[id].fold = false;
        else {
            // 搜索fid
            let fid = this.find_father_id(this.tree, id);
            this.father_obj[fid].fold = true;
        }
        // 重新生成output
        this.output = this.flatten(this.tree, this.father_obj);
    }
}

let smart_view = Vue.extend({
    template: `
    <div class="container">
        <div>&nbsp;</div>
        <div class="word" v-for="item in analyzer.output" :key="item.id"
            :style="{ color: item.color, textDecoration: item.line }" @mouseover="word_focus(item.id)"
            @mouseleave="word_blur(item.id)" @click="word_hide(item.id)">{{item.content+" "}}</div>
    </div>
    `,
    props: ["text"],
    data() {
        return {
            analyzer: new Analyzer(this.text),
        }
    },

    watch: {
        text(val) {
            this.analyzer.set_sentence(val);
        },
    },

    methods: {
        word_focus(id) {
            this.analyzer.hoverItem(id, true);
        },
        word_blur(id) {
            this.analyzer.hoverItem(id, false);
        },
        word_hide(id) {
            this.analyzer.clickItem(id);
            this.analyzer.hoverItem(id, false);
        },
    },
});

Vue.component('smart_view', smart_view);

let vm = new Vue({
    el: "#root",
    data() {
        return {
            textArr: data,
            text: data[0],
        }
    },
    components: { smart_view }
});

