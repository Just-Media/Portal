function
msdb(homeUrl, db, tname, sid, sidst, pkName)
{
        ;

        this.homeUrl = homeUrl ;
        this.db = db ;
        this.tname = tname ;
        this.sid = sid ;
        this.sidst = sidst ;
        this.pkName = pkName ;

        this.ieMenuIsV = 0;
        this.iuFailed = false ;
        this.uFailedId = 0;
        this.isChange = false;
        this.isNew = false;
        this.changeVisitCtl = 0;
        this.rows = new Array();
        this.failedNew = new Array();
        this.colnames = new Array();
        this.coltypes = new Array();
        ;
        return(this);
}



function
msdbRandom()
{
        var d;

        ;

        d = new Date();

        return(
                d.getMinutes() * 60 * 1000 +
                d.getSeconds() * 1000 +
                d.getMilliseconds()
                );
}



function
msdbCmdStr(action, args)
{
        var tnameCmd;

        ;

        if ( action == '' )
                act = '';
        else
                act = '&msdbEA=' + action ;

        addArgs = ''
        if ( args.indexOf('msdbDB') == -1 )
                addArgs += "&msdbDB=" + msdbTop.db ;
        if ( args.indexOf('msdbTNAME') == -1 )
                addArgs += "&msdbTNAME=" + msdbTop.tname ;

        loc = '?' +
                "msdbSID=" + msdbTop.sid +
                "&msdbSIDST=" + msdbTop.sidst +
                "&msdb_t0=" + msdbRandom() +
                act +
                addArgs +
                args
                ;

        return(loc);
}



function
msdbCmd(action, args)
{
        ;
        loc = msdbCmdStr(action, args);
        location = loc ;
}



function
msdbRow2string(r)
{
        var i, s;

        s = "" ;

        for(i=0;i<r.length;i++)
                if ( i == 0 )
                        s += r[i] ;
                else
                        s += "-" + r[i] ;

        return(s);
}



function
msdbRow(msdbPkval)
{
        ;
        this.msdbPkval = msdbPkval;
        this.row = new Array();
        return(this);
}



function
msdbSaveEvent()
{
        ;
        msdbTop.mouseX = event.clientX;
        msdbTop.mouseY = event.clientY;
}
function
msdbSaveMouse()
{
        ;
        if ( ! event )
                return;
        msdbSaveEvent(event);
}





function
msdbMover(text)
{
        msdbSaveMouse();

        ;

        if (
                                msdbTop.lastMoverX &&
                                msdbTop.isMover &&
                                text == msdbTop.lastText &&
                                (ax = msdbTop.lastMoverX - msdbTop.mouseX) < 2 && ax > -2 &&
                                (ay = msdbTop.lastMoverY - msdbTop.mouseY) < 2 && ay > -2
                        )
                return;

        msdbTop.isMover = true ;
        msdbTop.lastMoverX = msdbTop.mouseX ;
        msdbTop.lastMoverY = msdbTop.mouseY ;
        if ( text != msdbTop.lastText ) {
                msdbMoverInnerId.innerHTML = text ;
                msdbTop.lastText = text ;
        }

        msdbShowDialogAt('msdbMoverId', false);
}



function msdbMout()
{
        msdbSaveMouse();

        ;

        if ( ! msdbTop.isMover )
                return;

        msdbMoverId.style.visibility = 'hidden';
        msdbTop.isMover = false ;
}



function
msdbFalse()
{
        ;
        return(false);
}



function
msdbNoOp()
{
        ;
        i = 1 ;
}



function
msdbIdStyleName(name)
{
        ;
        return(name + ".style");
}



function
msdbDateStr(d)
{
        ;
        if ( d == 0 )
                return("");
        mName = new Array('', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec');

        s = "" + d;

        m = Number(s.substr(4, 2));
        d = Number(s.substr(6, 2));
        y = Number(s.substr(0, 4));

        ret =
                mName[m] + " " +
                d + " " +
                y + " "
                ;
        return(ret);
}
function
msdbAlert()
{
        ;
        s = "";

        for(i=1;i<arguments.length;i++) {
                s += arguments[i] + ": " + arguments[i+1];
                i++;
                if ( i != arguments.length-1 )
                        s += ' -- ' ;
        }
        alert(arguments[0] + '>>> ' + s);
}



function
msdbAlertForm(f)
{
        ;
        s = "Form Name=" + f.name + "\n" ;
        for(i=0;i<f.length;i++)
                s += '\tf[' + i + '] : ' + f[i].name + ' = ' + f[i].value + "\n" ;

        alert(s);
}



function
msdbBack()
{
        ;
        window.history.back();
}



function
msdbForm(n)
{
        ;
        ;

        nnewForm = document.forms[0];
        changeForm = document.forms[1] ;
        searchForm = document.forms[2] ;


        if ( n == '' ) {
                if ( msdbTop.isChange == true || msdbTop.isNew == true )
                        return(changeForm);
                else
                        return(nnewForm);
        } else if ( n == 'Change' )
                return(changeForm);
        else
                return(searchForm) ;
}



function
msdbIsHebLetter(l)
{
        ;
        if ( l >= 'A' && l <= 'Z' || l == '_' )
                return(true);

        return(false);
}



function
msdbHebLetter(l)
{
        ;

        if ( msdbIsHebLetter(l) == false )
                return(l);

        jstr = 'ret = hebLetter' + l + '.innerHTML ; ' ;
        eval(jstr);
        return(ret);
}



function
msdbDbToHeb(s)
{
        var i;

        ;
        len = s.length;
        ret = "";
        for(i=0;i<len;i++)
                ret += msdbHebLetter(s.charAt(i));
        return(ret);
}



function
msdbFindRow(msdbPkval)
{
        var d, i;

        ;
        ;

        d = msdbTop.rows;
        ;
        for(i=0;i<d.length;i++) {
                ;
                if ( d[i].msdbPkval == msdbPkval )
                        return(d[i].row);
        }
        return(null);
}



function
msdbFillForm(msdbPkval)
{
        var r, f, i, jstr;

        ;
        ;

        f = msdbForm('Change');

        r = msdbFindRow(msdbPkval);

        if ( r == null ) {
                alert("msdbNewOrChange: Can not find data to change.");
                return;
        }

        for(i=0;i<r.length;i++) {
                if ( msdbTop.coltypes[i] == 'hebrew' )
                        s = msdbDbToHeb(r[i]);
                else
                        s = r[i];

                jstr = 'f.' + msdbTop.colnames[i] + '.value =  s ; ' ;
                eval(jstr);
        }
}



function
msdbNewOrChange(msdbPkval)
{
        var f, field0, jstr;

        ;
        ;


        if ( msdbTop.changeVisitCtl != 1 || msdbTop.iuFailed != 1 || msdbTop.uFailedId != msdbPkval )
                msdbFillForm(msdbPkval)

        msdbShowDialog('changeId');
        alStrX = "sLeft=" + msdbScrollLeft() + " msdbTop.mouseX=" + msdbTop.mouseX ;
        alStrY = "sTop=" + msdbScrollTop() + " msdbTop.mouseY=" + msdbTop.mouseY ;
        msdbPlaceDialog('changeId', 8, msdbScrollTop() + msdbTop.mouseY - 12);

        f = msdbForm('Change');
        field0 = 'f.' + msdbTop.colnames[0] ;
        jstr = field0 + '.focus(); ' + field0 + '.select();' ;
        ;
        eval(jstr);

}



function
msdbHideChange()
{
        ;
        msdbTop.isChange = false ;
        msdbTop.isNew = false ;

        msdbHideDialog('changeId');
}



function
msdbHideSearch()
{
        ;
        msdbHideDialog('searchId');
}



function
msdbSearch()
{

        ;
        ;


        f = msdbForm('Search');

        msdbShowDialog('searchId');
        alStrX = "sLeft=" + msdbScrollLeft() + " msdbTop.mouseX=" + msdbTop.mouseX ;
        alStrY = "sTop=" + msdbScrollTop() + " msdbTop.mouseY=" + msdbTop.mouseY ;
        msdbPlaceDialog('searchId', 8, msdbScrollTop() + msdbTop.mouseY - 12);
        field0 = 'f.' + msdbTop.colnames[0] ;
        jstr = field0 + '.focus(); ' + field0 + '.select();' ;
        eval(jstr);
}



function
msdbChange(msdbPkval)
{
        ;
        ;

        changeId.className = 'changeClass' ;

        f = msdbForm('Change');
        f.msdbEA.value = "msdbUpdate" ;
        f.msdbPkval.value = msdbPkval ;

        msdbTop.isChange = true ;

        msdbTop.changeVisitCtl++;
        msdbNewOrChange(msdbPkval);
        msdbTop.changeVisitCtl++;

}



function
msdbNewCopy()
{
        ;
        f = msdbForm('Change');
        f.submit();
}



function
msdbNew(msdbPkval)
{
        ;
        msdbTop.isNew = true ;
        changeId.className = 'newClass' ;
        f = msdbForm('Change');
        f.msdbEA.value = "msdbInsert" ;
        msdbNewOrChange(msdbPkval);
}



function
msdbDelete(msdbPkval)
{
        var r;

        ;

        r = msdbFindRow(msdbPkval);

        if ( ! confirm("Are you Sure you want to Discard this entry\n(" + msdbRow2string(r) + ") ?"))
                return;

        msdbCmd("msdbDelete", "&msdbPkval=" + msdbPkval + "&msdbPkName=" + msdbTop.pkName);
}



function
msdbSpotSet(isHeb, fname, dbval)
{
        var form;
        var val;
        var jstr;
        var idname;

        ;

        form = msdbForm('');
        if ( isHeb == 0 )
                val = dbval;
        else
                val = msdbDbToHeb(dbval);

        jstr = "form." + fname + ".value = val ; " ;

        eval(jstr);

        idname = "msdbSpotID" + fname ;

        msdbHideDialog(idname);
}



function
msdbStatRestrict(fname, fvalue)
{
        ;


        msdbCmd('msdbInsert', '&msdbStatRestrict=' + '&' + fname + '=%3D+' + fvalue);
}



function
msdbDateRestrict(s)
{
        ;

        msdbCmd('', '&msdbDateRestrict=' + s);
}
