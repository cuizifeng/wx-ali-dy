import datas from './area';
export const areas = datas.data;
function areaIdFnc(id, fn) {
    //定义变量保存当前结果路径
    var temppath = [];
    var temp = [];
    try {
        function getNodePath(node) {
            temppath.push(node.name);
            temp.push(node.value);
            //找到符合条件的节点，通过throw终止掉递归
            if (node.value == id) {
                throw ("GOT IT!");
            }
            if (node.children && node.children.length > 0) {
                for (var i = 0; i < node.children.length; i++) {
                    getNodePath(node.children[i]);
                }
                //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
                temppath.pop();
                temp.pop();
            }
            else {

                //找到叶子节点时，删除路径当中的该叶子节点
                temppath.pop();
                temp.pop();
            }
        }
        getNodePath({ name: '', children: areas });
    }
    catch (e) {
        let names = temppath.filter(i => i);
        try {
            if (fn) fn(temp.filter(i => i), { id: '', name: names.join(" ") || '', names },);
        } catch (error) {
            console.log('error', error);
        }
        return { id: '', name: names.join(" ") || '' };
    }
};
export var areaId = areaIdFnc;
export var area_id = areaIdFnc;
export var city_id = areaIdFnc;