import { _decorator, Component, Node, EditBox, Input, UITransform, JsonAsset, instantiate, Prefab, Label, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Registration')
export class Registration extends Component {
    @property(EditBox)
    public Name: EditBox = null!;

    @property(EditBox)
    public Username: EditBox = null!;

    @property(EditBox)
    public Password: EditBox = null!;

    @property(EditBox)
    public ConfirmPassword: EditBox = null!;

    @property(EditBox)
    public Mobile: EditBox = null!;

    @property(EditBox)
    public Gender: EditBox = null!;

    @property(EditBox)
    Country: EditBox = null;

    @property(Node)
    dropDownIcon = null;

    @property(Node)
    scrollView = null;

    @property({ type: JsonAsset })
    countries = null;

    @property(Prefab)
    dropDownItem = null;

    @property(Node)
    CountryField = null;

    @property(Node)
    crossIcon = null;

    dropDownCheck = false;

    onLoad() {
        this.Name.node.on('text-changed', this.editBegin, this);
        this.dropDownIcon.on(Input.EventType.TOUCH_START, this.dropDown, this);
        this.crossIcon.on(Input.EventType.TOUCH_START, this.dropDown, this);
        let countryData = this.countries.json.Country;
        this.crossIcon.active = false;
        countryData.map((e) => {
            let item = instantiate(this.dropDownItem);
            item.on(Input.EventType.TOUCH_START, this.addDropDownItem, this)
            item.children[0].getComponent(Label).string = e.name;
            this.scrollView.getChildByName("view").getChildByName("content").addChild(item);
        });
    }


    /**
     * 
     * @param text 
     * @description adding elements from json to editbox
     */
    addDropDownItem(text) {
        const name = text.target._children[0].getComponent(Label).string;
        this.CountryField.getComponent(EditBox).string = name;
        this.scrollView.active = false;
        this.dropDownCheck = false;
        this.crossIcon.active = false;
        this.dropDownIcon.active = true;
    }

    /**
     * @description handling the functionality of dropDown scrollbar
     */
    dropDown() {

        this.scrollView.active = true;
        let scrollViewArr = this.scrollView.children;
        if (!this.dropDownCheck) {
            this.crossIcon.active = true;
            this.dropDownIcon.active = false;
            tween(this.scrollView)
                .to(0, { scale: new Vec3(1, 0.6, 0) })
                .to(0.0462, { scale: new Vec3(1, 1, 1) })
                .to(0.0462, { scale: new Vec3(1, 1.06, 1) })
                .to(0.066, { scale: new Vec3(1, 1, 1) })
                .to(0.099, { scale: new Vec3(1, 1.15, 1) })
                .start();
            scrollViewArr.map((e) => {
                e.setScale(1, 1);
            })
            this.dropDownCheck = true;
        }
        else {
            this.crossIcon.active = false;
            this.dropDownIcon.active = true;
            this.scrollView.setScale(1, 0);
            scrollViewArr.map((e) => {
                e.setScale(1, 0);
            })
            this.dropDownCheck = false;
        }

    }


    editBegin(name) {
        console.log(name._string);

    }

    start() {

    }


    update(deltaTime: number) {

    }
}

