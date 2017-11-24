import Mock from 'mockjs';

// 根据专题id获取平台id
Mock.mock(/\/plugin\/diyspecial\/get-platform/, 'get', {
    "platform": "5a12478e931c750f008b4568",
    "state": 1,
    "message": "成功获取当前平台id！"
});

// 根据专题id获取栏目链接列表
Mock.mock(/\/plugin\/diyspecial\/special-clumn/, 'get', {
    "list": [{
            "name": "栏目名称",
            "url": "http://qwerq.www?key=5a14ed25cc11938823000030"
        },
        {
            "name": "栏目名称",
            "url": "http://qwerq.www?key=5a14ed25cc11938823000031"
        },
        {
            "name": "栏目名称",
            "url": "http://qwerq.www?key=5a14ed25cc11938823000032"
        },
        {
            "name": "栏目名称",
            "url": "http://qwerq.www?key=5a14ed25cc11938823000033"
        },
        {
            "name": "栏目名称",
            "url": "http://qwerq.www?key=5a14ed25cc11938823000034"
        },
        {
            "name": "栏目名称",
            "url": "http://qwerq.www?key=5a14ed25cc11938823000035"
        }
    ],
    "state": 1,
    "message": "成功获取当前专题栏目链接列表！"
});

// 根据专题id获取当前平台的标签列表
Mock.mock(/\/plugin\/diyspecial\/tags-list/, 'get', {
    "list": [{
            "id": "5a124881cc1193e41700002c",
            "name": "人物二"
        },
        {
            "id": "5a124879cc1193e41700002b",
            "name": "空间二"
        },
        {
            "id": "5a124870cc1193901b00002d",
            "name": "时间二"
        },
        {
            "id": "5a124867cc1193901b00002c",
            "name": "标签二"
        },
        {
            "id": "5a124823cc1193901b00002a",
            "name": "人物一"
        },
        {
            "id": "5a124818cc1193f004000029",
            "name": "空间一"
        },
        {
            "id": "5a12480ecc1193e417000029",
            "name": "时间一"
        },
        {
            "id": "5a124802cc1193901b000029",
            "name": "标签一"
        }
    ],
    "state": 1,
    "message": "成功获取当前平台的标签列表！"
});

Mock.mock(/\/plugin\/diyspecial\/model-save/, 'post', {
    "state": 1,
    "message": "保存成功"
});

export default Mock;
