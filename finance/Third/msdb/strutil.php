<?php
/************************************************************/



$rcsid='$Id: strutil.php,v 1.13 2004/03/30 12:58:24 engine Exp engine $ ';
$copyRight="Copyright (c) Ohad Aloni 1990-2004. All rights reserved.";
$licenseId="Released under http://ohad.dyndns.org/license.txt (BSD)";
/************************************************************/

/*
 * see also, msdbStrParse()
 * parse str containing name=value&name1=value1
 * into a = array(..., 'name1' => 'value1', ...)
 * and return the array
 * this is just an alias of parse_str(), with some call sequence changes
 */

function msdbParse($str)
{
        parse_str($str, $a);

        return($a);
}

/******************************/

function msdbUnparse($a)
{
        $str = "";

        foreach ( $a as $k => $v )
                if ( $str == "" )
                        $str .= $k."=".$v ;
                else
                        $str .= "&".$k."=".$v ;
        return($str);
}

/************************************************************/

function msdbJsCmd($action, $args)
{
        $ret = "javascript:msdbCmd('$action', '$args')" ;
        return($ret);
}

/******************************/

function msdbStdUrlArgs()
{
        global $msdbEnterVar;

        $sid = $msdbEnterVar->sid;
        $started = $msdbEnterVar->started;
        $ret = "msdbSID=$sid&msdbSIDST=$started";
        return($ret);
}

/******************************/

function msdbTableUrl($tname)
{
        return(msdbJsCmd("", "&msdbTNAME=$tname"));
}

/************************************************************/

function msdbJs($s)
{
        echo "<SCRIPT LANGUAGE=\"JavaScript\"> $s </SCRIPT>\n" ;
}

/************************************************************/

/*
 * make $str a valid javascript value.
 */

function msdbJsStr($str)
{
        return(ereg_replace("'", "\\'", $str));
}

/************************************************************/
/************************************************************/
/************************************************************/
?>
