class NavbarData {
    constructor(guid = '', navItemList) {
        this.guid = guid;
        this.type = 'navbar';
        this.navItemList = navItemList || [];
    }
}

export default NavbarData;
