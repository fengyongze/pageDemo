define(function() {
    function tableClick() {
        var nbTableUnseclect = tableClick.init.nbTableUnseclect,
            nbTableCanUnlock = tableClick.init.nbTableCanUnlock;
        $(nbTableCanUnlock).on("click", this.canUnlock);
        $(nbTableUnseclect).on("click", this.canSeclect);
        $(nbTableCanUnlock + "," + nbTableUnseclect).on("click", function() {
            tableClick.prototype.changeVerticalAndGroundNumber(this);
            tableClick.prototype.headerRightClass();
            tableClick.prototype.data(this);
        });
    }
    tableClick.prototype.changeVerticalAndGroundNumber = function(elm) {
        var lockClass = tableClick.init.lockClass,
            nbTable = tableClick.init.nbTable,
            verticalDiv = tableClick.init.verticalDiv,
            groundNumberSpan = tableClick.init.groundNumberSpan,
            clickClass = tableClick.init.clickClass,
            canUnlockClass = tableClick.init.canUnlockClass;
        //获得点击表格按钮的所在行
        var row = $(elm).data("row"),
            //获得点击表格按钮的所在列
            col = $(elm).data("col"),
            //获得表格的一个行
            tableRow = $(nbTable + " [data-row=" + row + "]"),
            //获得表格的上一行
            tableRowPre = $(nbTable + " [data-row=" + (row - 1) + "]"),
            //获得表格下一行
            tableRowNext = $(nbTable + " [data-row=" + (row + 1) + "]"),
            //获得表格一列
            tableCol = $(nbTable + " [data-col=" + col + "]");
        //为时间纵轴动态添加.click
        if (tableRow.hasClass(lockClass) || tableRow.hasClass(canUnlockClass)) {
            $(verticalDiv).eq(row).addClass(clickClass);
            $(verticalDiv).eq(row - 1).addClass(clickClass);
        } else {
            $(verticalDiv).eq(row).removeClass(clickClass);
            $(verticalDiv).eq(row - 1).removeClass(clickClass);
            //如果上一行或下一行有.lock则添加回.click
            if (tableRowPre.hasClass(lockClass) || tableRowPre.hasClass(canUnlockClass)) {
                $(verticalDiv).eq(row - 1).addClass(clickClass);
            } else if (tableRowNext.hasClass(lockClass) || tableRowNext.hasClass(canUnlockClass)) {
                $(verticalDiv).eq(row).addClass(clickClass);
            }
        }
        //为场号横轴动态添加.lock
        if (tableCol.hasClass(lockClass) || tableCol.hasClass(canUnlockClass)) {
            $(groundNumberSpan).eq(col - 1).addClass(clickClass);
        } else {
            $(groundNumberSpan).eq(col - 1).removeClass(clickClass);
        }
    };
    tableClick.prototype.data = function(elm) {
        var nbTable = tableClick.init.nbTable,
            //时间轴
            verticalDiv = tableClick.init.verticalDiv,
            //球场号轴
            groundNumberSpan = tableClick.init.groundNumberSpan,
            unseclectClass = tableClick.init.unseclectClass,
            lockedClass = tableClick.init.lockedClass,
            //获得点击表格按钮的所在行
            row = $(elm).data("row"),
            //获得点击表格按钮的所在列
            col = $(elm).data("col"),
            //获得表格的一个行
            tableRow = $(nbTable + " [data-row=" + row + "]"),
            //获得表格的上一行
            tableRowPre = $(nbTable + " [data-row=" + (row - 1) + "]"),
            //获得表格一列
            tableCol = $(nbTable + " [data-col=" + col + "]"),
            //把日期时间场馆堆入JSON数据
            order = tableClick.init.order,
            obj = {
                time: $(verticalDiv).eq(row - 1).text() + "~" + $(verticalDiv).eq(row).text(),
                ground: $(groundNumberSpan).eq(col - 1).text()
            };

        if ($(elm).hasClass(unseclectClass) || $(elm).hasClass(lockedClass)) {
            for (var i in order.msg) {
                if (JSON.stringify(order.msg[i]) === JSON.stringify(obj)) {
                    order.msg.splice(i, 1);
                }
            }
        } else {
            order.msg.push(obj);
        }
    };
    tableClick.prototype.canSeclect = function() {
        var lockClass = tableClick.init.lockClass,
            lockedClass = tableClick.init.lockedClass,
            unseclectClass = tableClick.init.unseclectClass,
            canUnlockClass = tableClick.init.canUnlockClass,
            nbTableCanUnlock = tableClick.init.nbTableCanUnlock,
            order = tableClick.init.order;
        $(this).toggleClass(lockClass + " " + unseclectClass);
        $(nbTableCanUnlock).each(function() {
            if ($(this).hasClass(canUnlockClass)) {
                $(this).removeClass(canUnlockClass);
                $(this).addClass(lockedClass);
                order.msg = [];
                tableClick.prototype.changeVerticalAndGroundNumber(this);
            }
        });
    };
    tableClick.prototype.canUnlock = function() {
        var canUnlockClass = tableClick.init.canUnlockClass,
            lockedClass = tableClick.init.lockedClass,
            lockClass = tableClick.init.lockClass,
            nbTableUnseclect = tableClick.init.nbTableUnseclect,
            order = tableClick.init.order;
        $(this).toggleClass(canUnlockClass + " " + lockedClass);
        $(nbTableUnseclect).each(function() {
            if ($(this).hasClass(lockClass)) {
                $(this).removeClass(lockClass);
                order.msg = [];
                tableClick.prototype.changeVerticalAndGroundNumber(this);
            }
        });
    };
    //改变顶部右边按钮的class
    tableClick.prototype.headerRightClass = function() {
        var nbTableUnseclect = tableClick.init.nbTableUnseclect,
            nbTableCanUnlock = tableClick.init.nbTableCanUnlock,
            verification = tableClick.init.verification,
            lockList = tableClick.init.lockList,
            verificationSpan = tableClick.init.verificationSpan,
            lockListSpan = tableClick.init.lockListSpan,
            headerUnlockAndLock = tableClick.init.headerUnlockAndLock,
            headerUnlock = tableClick.init.headerUnlock,
            headerLock = tableClick.init.headerLock,
            headerRightClickClass = tableClick.init.headerRightClickClass,
            lockClass = tableClick.init.lockClass,
            canUnlockClass = tableClick.init.canUnlockClass,
            verificationCanClick = tableClick.init.verificationCanClick,
            lockListCanClick = tableClick.init.lockListCanClick,
            hiddenClass = tableClick.init.hiddenClass;
        //当表格有锁定的class时
        if ($(nbTableUnseclect).hasClass(lockClass)) {
            //验证和长锁清单禁止点击
            $(lockListSpan + "," + verificationSpan).addClass(headerRightClickClass);
            //隐藏解锁锁定按钮
            $(headerUnlockAndLock).addClass(hiddenClass);
            //隐藏解锁按钮
            $(headerUnlock).addClass(hiddenClass);
            //显示出锁定按钮
            $(headerLock).removeClass(hiddenClass);
            //验证和长锁清单禁止点击
            $(verification).removeClass(verificationCanClick);
            $(lockList).removeClass(lockListCanClick);
        } else if ($(nbTableCanUnlock).hasClass(canUnlockClass)) {
            $(lockListSpan + "," + verificationSpan).addClass(headerRightClickClass);
            $(headerUnlockAndLock).addClass(hiddenClass);
            $(headerUnlock).removeClass(hiddenClass);
            $(headerLock).addClass(hiddenClass);
            $(verification).removeClass(verificationCanClick);
            $(lockList).removeClass(lockListCanClick);
        } else {
            $(lockListSpan + "," + verificationSpan).removeClass(headerRightClickClass);
            $(headerUnlockAndLock).removeClass(hiddenClass);
            $(headerUnlock).addClass(hiddenClass);
            $(headerLock).addClass(hiddenClass);
            $(verification).addClass(verificationCanClick);
            $(lockList).addClass(lockListCanClick);
        }
    };
    tableClick.init = {
        //表格内的没有选择的按钮
        nbTableUnseclect: ".nbTable div [data-state=unseclect]",
        //表格内可以被解锁的按钮
        nbTableCanUnlock: ".nbTable div [data-state=locked]",
        //表格
        nbTable: ".nbTable",
        //验证按钮的dom节点
        verification: "#verification",
        //验证按钮的spandom节点
        verificationSpan: "#verification span",
        //长锁订单按钮的dom节点
        lockList: "#lockList",
        //长锁订单按钮的spandom节点
        lockListSpan: "#lockList span",
        //解锁锁定按钮
        headerUnlockAndLock: "#headerUnlockAndLock",
        //解锁按钮
        headerUnlock: "#headerUnlock",
        //锁定按钮
        headerLock: "#headerLock",
        //时间纵轴
        verticalDiv: ".vertical div",
        //场号横轴
        groundNumberSpan: ".groundNumber span",
        //动态添加lock的class
        lockClass: "canLockImg",
        //用在横轴和纵轴上的动态添加click的class
        clickClass: "click",
        //用在验证上的动态添加的class
        verificationCanClick: "verificationCanClick",
        //用在长锁清单上的动态添加的class
        lockListCanClick: "lockListCanClick",
        //动态添加hidden的class
        hiddenClass: "hidden",
        //没有选择的表格
        unseclectClass: "unseclect",
        //动态添加已锁定的class
        lockedClass: "lockedImg",
        //动态添加可解锁的class
        canUnlockClass: "canUnlockImg",
        //动态添加headerRightClick
        headerRightClickClass: "headerRightClick",
        order: {
            "msg": []
        }
    };
    return {
        tableClick: tableClick
    };
});