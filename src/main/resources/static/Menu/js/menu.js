window.onload = () => {
    init_nav_bar();
    init_left_panel();
    console.log("loaded");
}


let currDish;


////////////////////////////////
//Navigation Bar Functionality//
////////////////////////////////
function init_nav_bar() {
    document.getElementById("navBarNewDish").onclick = () => {
        edit_new_dish();
    }
}


////////////////////////////////////
//Left Panel Display Functionality//
////////////////////////////////////
function init_left_panel() {
    load_dish_list(load_left_panel_buttons);
}

function load_left_panel_buttons(metas) {
    let parent = document.getElementById("dishMetaContainer");
    parent.innerHTML = "";
    metas.infoList.forEach(m => {
        let btn = htmlToElement(getLeftPanelInfoButtonString());
        btn.innerHTML = m.dishName;
        btn.id = "leftDishButton-" + m.dishId;
        btn.onclick= () => load_dish(m.dishId, display_current_dish);
        parent.appendChild(btn);
    })
}

function getLeftPanelInfoButtonString() {
    return '<button type="button" class="list-group-item list-group-item-action"></button>'
}


////////////////////////////////////
//Main Panel General Functionality//
////////////////////////////////////
function init_main_panel(dis) {
    const mp = document.getElementById("mainActive");
    if (dis) {
        mp.innerHTML = getMainPanelDisplayTemplate();
        addFunctionalityToMainPanelDisplay();
    } else {
        mp.innerHTML = getMainPanelEditorTemplate();
        addFunctionalityToMainPanelEditor();
    }
}

function clear_main_panel() {
    const mp = document.getElementById("mainActive");
    mp.innerHTML = "";
}


////////////////////////////////////
//Main Panel Display Functionality//
////////////////////////////////////
function display_current_dish() {
    init_main_panel(true);

    // Load Name
    document.getElementById("mainName").innerHTML = currDish.name;

    // Load Ingredients
    let ingredientContainer = document.getElementById("mainIngredientContainer");
    for (let i = 0; i < currDish.parts.length; i++) {
        let p = currDish.parts[i];
        let partName = p.partName;
        let partAmount;
        if (p.amount === 0) {
            partAmount = "适量";
        } else {
            partAmount = p.amount.toString();
        }
        let partUnit;
        if (p.unit == null) {
            partUnit = "";
        } else {
            partUnit = p.unit;
        }
        let content = '<i class="bi-dot"></i> ' + partName + ' ' + partAmount + ' ' + partUnit;
        let ingId = "ingredient-"+ i;
        let ing = htmlToElement(getMainPanelContentTemplate(ingId, content));
        ing.dataset.idx = i.toString();
        ingredientContainer.appendChild(ing);
    }

    // Load Steps
    let stepContainer = document.getElementById("mainStepContainer");
    for (let i = 0; i < currDish.step.length; i++) {
        let s = currDish.step[i];
        let titleContent = '<i class="bi-dash"></i><strong> 第 ' + (i+1) + ' 步</strong>';
        let titleId = "stepTitle-" + i;
        let stepTitle = htmlToElement(getMainPanelContentTemplate(titleId, titleContent));
        let stepContent = s;
        let stepId = "step-" + i;
        let step = htmlToElement(getMainPanelContentTemplate(stepId, stepContent));
        stepContainer.appendChild(stepTitle);
        stepContainer.appendChild(step);
    }

    // Load Comment
    let commentContainer = document.getElementById("mainCommentContainer");
    let commentContent;
    if (currDish.comments == null) {
        commentContent = "无";
    } else {
        commentContent = currDish.comments;
    }
    let commentId = "comment";
    let comment = htmlToElement(getMainPanelContentTemplate(commentId, commentContent));
    commentContainer.appendChild(comment);
}

function addFunctionalityToMainPanelDisplay() {
    document.getElementById("mainEditCurrentButton").onclick = () => {
        edit_current_dish();
    }
    document.getElementById("mainDeleteModalConfirmButton").onclick = () => {
        delete_current_dish();
    }
}

function getMainPanelDisplayTemplate() {
    return '<div class="main-display normal-height-div" id="mainDisplay">\n' +
        '                        <div class="main-section horizontal-div" id="mainNameContainer">\n' +
        '                            <h1 class="main-name" id="mainName"></h1>\n' +
        '                            <a class="mainDisplayFunctionalityButton text-success" id="mainAddToCartButton" role="button"><i class="bi-cart-plus"></i></a>\n' +
        '                            <a class="mainDisplayFunctionalityButton text-primary" id="mainEditCurrentButton" role="button"><i class="bi-pencil-square"></i></a>\n' +
        '                            <a class="mainDisplayFunctionalityButton text-danger" id="mainDeleteCurrentButton" role="button"  data-bs-toggle="modal" data-bs-target="#mainDeleteModal"><i class="bi-trash"></i></a>\n' +
        '                        </div>\n' +
        '                        <div class="main-section" id="mainIngredientContainer">\n' +
        '                            <h3 class="main-ingredient-title" id="mainIngredientTitle"><i class="bi-journals"></i> 材料\n' +
        '                            </h3>\n' +
        '                        </div>\n' +
        '                        <div class="main-section" id="mainStepContainer">\n' +
        '                            <h3 class="main-step-title" id="mainStepTitle"><i class="bi-ui-checks"></i> 步骤</h3>\n' +
        '                        </div>\n' +
        '                        <div class="main-section" id="mainCommentContainer">\n' +
        '                            <h3 class="main-comment-title" id="mainCommentTitle"><i class="bi-chat-left-dots"></i> 备注\n' +
        '                            </h3>\n' +
        '                        </div>\n' +
        '                    </div>\n' +
        getDeleteModal()
        ;
}

function getMainPanelContentTemplate(eleId, content) {
    let idString;
    if (eleId == null) {
        idString = '';
    } else {
        idString = ' id="' + eleId + '"';
    }
    return '                            <div' +
        idString +
        '>\n' +
        '                                <p>' +
        content +
        '</p>\n' +
        '                            </div>\n';
}

function getDeleteModal() {
    return '<div class="modal fade" id="mainDeleteModal" tabindex="-1" aria-labelledby="mainDeleteModalLabel" aria-hidden="true">\n' +
        '  <div class="modal-dialog modal-dialog-centered">\n' +
        '    <div class="modal-content">\n' +
        '      <div class="modal-header">\n' +
        '        <h5 class="modal-title" id="mainDeleteModalLabel">确认删除</h5>\n' +
        '        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>\n' +
        '      </div>\n' +
        '      <div class="modal-body">\n' +
        '        确认删除菜品吗?\n' +
        '      </div>\n' +
        '      <div class="modal-footer">\n' +
        '        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>\n' +
        '        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="mainDeleteModalConfirmButton">确认</button>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</div>\n';
}


/////////////////////////////////
//Main Panel Edit Functionality//
/////////////////////////////////
function edit_new_dish() {
    init_main_panel(false);
    addFunctionalityToMainPanelEditor();
    initNewDishSubmitter();
}

function edit_current_dish() {
    init_main_panel(false);
    addFunctionalityToMainPanelEditor();
    load_current_dish_to_editor();
    initEditDishSubmitter(currDish.id);
}

function delete_current_dish() {
    delete_dish(currDish.id, handleDeleteSubmissionResponse);
}

function addFunctionalityToMainPanelEditor() {
    document.getElementById("mainIngredientAddNewButton").onclick = () => {
        let row = '<tr class="main-ingredient-editor-row">' +
            '<td><input type="text" maxlength="20" class="form-control main-edit-required"></td>' +
            '<td><input type="number" min="0" class="form-control"></td>' +
            '<td><input type="text" maxlength="10" class="form-control"></td>' +
            '<td><a class="mainEditorDelete"><i class="bi-x-circle"></i></a></td>' +
            '</tr>';
        $("#ingredientTableBody").append(row);
    }
    document.getElementById("mainStepAddNewButton").onclick = () => {
        let row = '<tr class="main-step-editor-row">' +
            '<td><textarea rows="3" cols="50"></textarea>' +
            '<td><a class="mainEditorDelete"><i class="bi-x-circle"></i></a></td>' +
            '</tr>';
        $("#stepTableBody").append(row);
    }
    $(document).on("click", ".mainEditorDelete", function(){
        $(this).parents("tr").remove();
    });
}

function load_current_dish_to_editor() {
    // Load Name
    document.getElementById("mainNameInput").value = currDish.name;

    // Load Ingredients
    let ingredientButton = document.getElementById("mainIngredientAddNewButton");
    for (let i = 0; i < currDish.parts.length; i++) {
        let p = currDish.parts[i];
        let partName = p.partName;
        let partAmount;
        if (p.amount === 0) {
            partAmount = "";
        } else {
            partAmount = p.amount.toString();
        }
        let partUnit;
        if (p.unit == null) {
            partUnit = "";
        } else {
            partUnit = p.unit;
        }
        ingredientButton.click();
        let newestLine = $(".main-ingredient-editor-row").last()[0];
        newestLine.children[0].children[0].value = partName;
        newestLine.children[1].children[0].value = partAmount;
        newestLine.children[2].children[0].value = partUnit;
    }

    // Load Steps
    let stepButton = document.getElementById("mainStepAddNewButton");
    for (let i = 0; i < currDish.step.length; i++) {
        let s = currDish.step[i];
        stepButton.click();
        let newestLine = $(".main-step-editor-row").last()[0];
        newestLine.children[0].children[0].value = s;
    }

    // Load Comment
    let comments;
    if (currDish.comments == null) {
        comments = "";
    } else {
        comments = currDish.comments;
    }
    document.getElementById("mainCommentInput").value = comments;
}

function initNewDishSubmitter() {
    $("#mainSubmitButton").click(function() {
        let checkStatus = validateEditorInput();
        if (checkStatus) {
            let dishDetail = concludeEditorToDish();
            add_new_dish(dishDetail, handleAddSubmissionResponse);
        }
    });
}

function initEditDishSubmitter(dishId) {
    $("#mainSubmitButton").click(function() {
        let checkStatus = validateEditorInput();
        if (checkStatus) {
            let dishDetail = concludeEditorToDish();
            edit_dish(dishId, dishDetail, handleEditSubmissionResponse);
        }
    });
}

function validateEditorInput() {
    let checkStatus = true;
    $(".main-edit-required").each(function (k, ele) {
        let v = ele.value;
        if (isEmpty(v)) {
            checkStatus = false;
            ele.classList.add("border-danger");
        } else {
            ele.classList.remove("border-danger");
        }
    });
    return checkStatus;
}

function concludeEditorToDish() {
    let dishDetail = {};

    // conclude name
    dishDetail.name = document.getElementById("mainNameInput").value.trim();

    // conclude parts
    let ingredients = [];
    $(".main-ingredient-editor-row").each(function (k, ele) {
        let ingredient = {};
        ingredient.partName = ele.children[0].children[0].value.trim();
        let amt = ele.children[1].children[0].value;
        if (amt != null) {
            ingredient.amount = amt.trim();
        }
        let unt = ele.children[2].children[0].value;
        if (unt != null) {
            ingredient.unit = unt.trim();
        }
        ingredients.push(ingredient);
    });
    dishDetail.parts = ingredients;

    // conclude steps
    let steps = [];
    $(".main-step-editor-row").each(function (k, ele) {
        let stp = ele.children[0].children[0].value;
        if (!isEmpty(stp)) {
            steps.push(stp.trim());
        }
    });
    if (steps.length > 0) {
        dishDetail.step = steps;
    }

    // conclude comments
    let comments = document.getElementById("mainCommentInput").value;
    if (!isEmpty(comments)) {
        dishDetail.comments = comments.trim();
    }
    return dishDetail;
}

// TODO: change alert to modal
function handleAddSubmissionResponse(rsp) {
    let num = Number(rsp);
    if (num === -1) {
        window.alert("菜名已被占用.");
    } else if (!isNaN(num)){
        init_left_panel();
        click_dish_button(rsp);
        window.alert("保存成功.");
    } else {
        window.alert("Something else happened when adding a dish.");
    }
}

// TODO: change alert to modal
function handleEditSubmissionResponse(rsp) {
    let num = Number(rsp);
    if (num === -1) {
        window.alert("菜名已被占用.");
    } else if (!isNaN(num)){
        init_left_panel();
        click_dish_button(rsp);
        window.alert("保存成功.");
    } else {
        window.alert("Something else happened when editing a dish.");
    }
}

// TODO: change alert to modal
function handleDeleteSubmissionResponse(rsp) {
    let num = Number(rsp);
    if (num === -1) {
        window.alert("发生错误.");
    } else if (num === 0){
        init_left_panel();
        clear_main_panel();
        window.alert("删除成功.");
    } else {
        window.alert("Something else happened when deleting a dish.");
    }
}

function getMainPanelEditorTemplate() {
    return '<div>' +
        getEditTitle("名称*") +
        getMainPanelNameEditorTemplate() +
        getEditTitle("材料") +
        getMainPanelIngredientEditorTemplate() +
        getEditTitle("步骤") +
        getMainPanelStepEditorTemplate() +
        getEditTitle("备注") +
        getMainPanelCommentEditorTemplate() +
        getSubmitButton() +
        '</div>';
}

function getMainPanelNameEditorTemplate() {
    return '<div class="editor-element-wrapper">\n' +
        '<input type="text" maxlength="20" class="form-control main-name-input main-edit-required" id="mainNameInput">\n' +
        '</div>\n';
}

function getMainPanelIngredientEditorTemplate() {
    return '        <div class="editor-element-wrapper">\n' +
        '            <table class="table table-bordered">\n' +
        '                <thead>\n' +
        '                    <tr>\n' +
        '                        <th style="width: 50%">名称*</th>\n' +
        '                        <th style="width: 20%">数量</th>\n' +
        '                        <th style="width: 20%">单位</th>\n' +
        '                        <th style="width: 10%">操作</th>\n' +
        '                    </tr>\n' +
        '                </thead>\n' +
        '                <tbody id="ingredientTableBody">\n' +
        '                </tbody>\n' +
        '            </table>\n' +
        '            <button type="button" class="btn btn-info" id="mainIngredientAddNewButton"><i class="bi-plus"></i> 添加</button>\n' +
        '        </div>\n';
}

function getMainPanelStepEditorTemplate() {
    return '        <div class="editor-element-wrapper">\n' +
        '            <table class="table table-bordered">\n' +
        '                <thead>\n' +
        '                    <tr>\n' +
        '                        <th style="width: 90%">步骤</th>\n' +
        '                        <th style="width: 10%">操作</th>\n' +
        '                    </tr>\n' +
        '                </thead>\n' +
        '                <tbody id="stepTableBody">\n' +
        '                </tbody>\n' +
        '            </table>\n' +
        '            <button type="button" class="btn btn-info" id="mainStepAddNewButton"><i class="bi-plus"></i> 添加</button>\n' +
        '        </div>\n';
}

function getMainPanelCommentEditorTemplate() {
    return '<div class="editor-element-wrapper">\n' +
        '<textarea rows="4" cols="70" class="main-comment-input" id="mainCommentInput"></textarea>\n' +
        '</div>\n';
}

function getEditTitle(title) {
    return '<div class="editor-title-wrapper">\n' +
        '<h3>' + title + '</h3>\n' +
        '</div>\n';
}

function getSubmitButton() {
    return '<div class="editor-submit-wrapper">\n' +
        '<button type="button" class="btn btn-success" id="mainSubmitButton"><i class="bi-save"></i> 保存</button>\n' +
        '</div>\n';
}


/////////////////
//General Utils//
/////////////////
function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function isEmpty(str) {
    return (str == null) || (!str.trim().length);
}

function click_dish_button(bid) {
    document.getElementById("leftDishButton-"+bid).click();
}


///////////////////////////////////
//Back End Resource Communication//
///////////////////////////////////
function load_dish_list(callBack) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/menu/dishes", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callBack(JSON.parse(xhr.response));
        }
    }
    xhr.send();
}

function load_dish(dishId, callBack) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "/menu/dish/"+dishId, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            currDish = JSON.parse(xhr.response);
            callBack();
        }
    }
    xhr.send();
}

function add_new_dish(dishObj, callBack) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/menu/add", false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callBack(xhr.response);
        }
    }
    xhr.send(JSON.stringify(dishObj));
}

function edit_dish(dishId, dishObj, callBack) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/menu/edit/"+dishId, false);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callBack(xhr.response);
        }
    }
    xhr.send(JSON.stringify(dishObj));
}

function delete_dish(dishId, callBack) {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", "/menu/delete/"+dishId, false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callBack(xhr.response);
        }
    }
    xhr.send();
}

// function init_buttons() {
//     const tb = document.getElementById("testButton");
//     tb.onclick = () => {
//         for (let i = 0; i < 36; i++) {
//             const myObj = {
//                 name: "gg" + i,
//                 step: ["step1-" + i, "step2-" + i, "step3-" + i],
//                 parts: [{partName: "p1-" + i, amount: 1.5, unit: "g"}, {partName: "p2-" + i, amount: 4, unit: "勺"}],
//                 "comments": "comment" + i
//             };
//             const xhr = new XMLHttpRequest();
//             xhr.open("POST", "http://localhost:8280/menu/add");
//             xhr.setRequestHeader("Content-Type", "application/json");
//
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState === 4) {
//                     console.log(xhr.response);
//                 }
//             }
//
//             xhr.send(JSON.stringify(myObj));
//         }
//     }
// }
