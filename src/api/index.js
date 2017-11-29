import tools from '@/tools';

import global from '@/global';

var fetch = tools.doNet;

var api = {
    getNavLinkList() {
        return fetch({
            url: '/plugin/diyspecial/special-clumn',
            method: 'get',
            data: {
                id: global.topicId
            }
        })
    },
    getTagList() {
        return fetch({
            url: '/plugin/diyspecial/tags-list',
            method: 'get',
            data: {
                id: global.topicId
            }
        })
    }
};

export default api;
