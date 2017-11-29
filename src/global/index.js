import tools from '@/tools';

var paramObj = tools.param2Obj(window.location.href);

var global = {
    topicId: paramObj.topicId || '5a17735a2b0aa80b008b4569',
    platformId: paramObj.platform || '5a12478e931c750f008b4568'
}

export default global;
