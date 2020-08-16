const Constants = {
    NumberOne: 1,
    menuMessage: 'here is the menu message'
};
Constants.install = function (Vue) {
    Vue.prototype.$getConst = (key) => {
        return Constants[key];
    }
};
export default Constants;
