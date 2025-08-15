<?php
header("Content-Type: application/json; charset=UTF-8");
date_default_timezone_set("Asia/Taipei");

function decodeString($str){
	// return htmlentities(utf8_decode($str));
	return $str;
}

if(!defined('docRoot')){define('docRoot', isset($_SESSION['documentRoot'])?$_SESSION['documentRoot']:'');}
if(strlen(docRoot)==0){die("<jsx>alert('Session Expired');location.reload();</jsx>");}
include_once(docRoot."lfunc.php");

if(!isset($_SESSION['feuptl_idno'])){
	die("<jsx>location.reload();</jsx>");
}

$par = file_get_contents('php://input');
parse_str($par, $params);

if(isset($params['x'])){
    
    
    
    $obj = json_decode($params["x"], false);


    if(!($obj instanceof stdClass)){
        trigger_error($params["x"]);
        die();
    }
	
    if(substr($obj->id,0,5) == 'fin__'){
        include docRoot."jq/feuapps/finance/pops_index.php";
        exit;
    }
    
    switch($obj->id){
        case "preenrcheckstatus":
            include "preenractivity.php";
            break;
        case "preenract":
            include "preenractmainpage.php";
            break;
        case "btnapprsldtaenc":
            include "gnc/appraisaldataenc.php";
            break;
        case "cboapprdtatestnme":
            $idno 		= $obj->idno;
            $testcode	= $obj->testname;
            include "gnc/appraisaltestqs.php";
            break;
        case "saveans":
            $idno 	= $obj->idno;
            $recid	= $obj->recid;
            $pkey	= $obj->pkey;
            $ans	= $obj->ans;
            include "gnc/appraisalsaveans.php";
            break;
        case "postans":
            $idno 		= $obj->idno;
            $testcode	= $obj->testname;		
            include "gnc/appraisalpostans.php";
            break;
        case "btnhdrstcreds":
            include "helpdesk/resetpw.php";
            break;
        case "txthdgetentity":
            $idno 		= test_input($obj->entid);
            include "helpdesk/getentity.php";
            break;
        case "btnhdrstpwdnw":
            $enttype	= test_input($obj->enttype);
            $idno 		= test_input($obj->entid);
            include "helpdesk/resetpwnow.php";
            break;
        case "btnafatools":
            include "afa/afamain.php";
            break;
        case "divafapreenrdata":
            include "afa/afapreenrdata.php";
            break;
        case "txtafapreenradconno":
            $adconno = test_input($obj->adconno);
            include "afa/afaadcondata1.php";
            break;
        case "lblafareqdlall":
            $adconno = test_input($obj->adconno);
            $abspath = '../../uploads/admreqs/';
            include "../../uploads/admreqs/archive.php";
            break;
        case "divafaupldreqs":
            include "afa/afauploadedreqs.php";
            break;
        case "loadapplist":
            $adconno	= substr(test_input($obj->adconno),0,10);
            $appname	= substr(test_input($obj->appname),0,25);
            $schonly	= substr(test_input($obj->schonly),0,1);
            $newOnly	= substr(test_input($obj->newOnly),0,1);
            $reEntry	= substr(test_input($obj->reEntry),0,1);
            include "afa/afauploadedreqs2.php";
            break;
        case "btnappdevtm":
            include "applications/index.php";
            break;
        case "btnfeucavite":
            include "cavite/index.php";
            break;
        case "btncaviteadmnewapplicants":
            include "cavite/admnewapplicants.php";
            break;		
        case "btnlegsysmonsmail":
            include "applications/sendmail.php";
            break;
        case "divacocanvasexec":
            include "applications/execacoscanvas.php";
            break;
        case "afadoccntrrst":
            
            $pmi_appsvr = new phpmysql();
            if($pmi_appsvr->init('newtb','academic')){

               if($pmi_appsvr->clear()){
                    $squery = "UPDATE academic.tb_mptluploads SET lhit = '1' WHERE recid = ?";
                    $pmi_appsvr->addparam('s');
                    $pmi_appsvr->addparam($obj->recid);
                    $pmi_appsvr->addcmd($squery);
                    
                    if ($pmi_appsvr->execcmd()) {
                        echo "<jsx>loadafapreenradcon();</jsx>";
                    } else {
                        echo "<jsx>alert('Reset failed');</jsx>";
                    }
                } 

            }
            unset($pmi_appsvr);
                   
        case "updsetqualstat":
            if (property_exists($obj, 'qualified')) {
                $recid      = substr(test_input($obj->recid), 0, 10);
                $qualified  = substr(test_input($obj->qualified), 0, 1);
                $ctrlid     = substr(test_input($obj->ctrlid), 0, 50);
                include "afa/afaschqualupd.php";
            } else {
                echo "<jsx>alert('Please clear your browser cache and then refresh this page');</jsx>";
            }
            break;
        case "ldschapplschd":
            include "afa/afaschappplsched.php";
            break;
        case "updschtpedte":
            $schtype    = substr(getStdData($obj, 'schtype'), 0, 10);
            $fld        = substr(getStdData($obj, 'fld'), 0, 1);
            $val        = substr(getStdData($obj, 'val'), 0, 15);
            include "afa/afaschappupdappldte.php";
            break;
        case "regsmainpage":
            include "registrar/index.php";
            break;
        case "app4gradendrsmnt":
            $returnPage = substr(getStdData($obj, 'returnPage'), 0, 25);
            $sid = substr(getStdData($obj, 'sid'), 0, 10);
            include "registrar/regappforgradendrsmnt.php";
            break;
        case "app4gradendrs":
            $idno    = substr(getStdData($obj, 'idno'), 0, 1000);
            include "registrar/regappforgradendrsnow.php";
            break;
        case 'app4gradrej':
            $idno    = substr(getStdData($obj, 'idno'), 0, 100);
            include "registrar/regappforgradreject.php";
            break;
        case "app4gradprvapprved":
            $rejected = false;
            include "registrar/regappforgradprvapprv.php";
            break;
        case 'app4gradprvrejectsd':
            $rejected = true;
            include "registrar/regappforgradprvapprv.php";
            break;
        case "credstagging":
            $sid = substr(getStdData($obj, 'sid'), 0, 10);
            include "registrar/regcredstagging.php";
            break;
        case "credstagnow":
            $idno       = substr(getStdData($obj, 'idno'), 0, 10);
            $doccode    = substr(getStdData($obj, 'doccode'), 0, 15);
            include "registrar/regcredstagnow.php";
            break;
        case "app4gradsendemail":
            $recid      = substr(getStdData($obj, 'recid'), 0, 10);
            $mailid     = substr(getStdData($obj, 'mailid'), 0, 25);
            include "registrar/regapgrademail.php";
            break;
        case "app4gradsendemainow":
            $emailmsg   = substr(isset($params['emailmsg'])?test_input($params['emailmsg']):'',0,255);
            $recid      = substr(getStdData($obj, 'recid'), 0, 10);
            $mailid     = substr(getStdData($obj, 'mailId'), 0, 25);
            include "registrar/regapgrademailnow.php";
            break;
        case "chkpendingreqs":
            include "registrar/regschkpendingreqs.php";
            break;
        case "setdocreqsbmtd2ofc":
            $doccode    = getStdData($obj, 'doccode');
            $sttcode    = getStdData($obj, 'sttcode');
            include "registrar/regssetdocreqsbmtdtoofc.php";
            break;
        case "regsstuddata":
            $idno = getStdData($obj, 'idno');
            include "registrar/regsstuddata.php";
            break;
        case "vwinfo":
            $idno       = getStdData($obj, 'idno');
            $pinfoId    = getStdData($obj, 'pinfoId');
            include "registrar/regsviewtab.php";
            break;
        case "shsearcheng":
            include "registrar/regsidnosearcheng.php";
            break;
        case "stdntsrcnow":
            $shsearcheng_txtidno        = substr(getStdData($obj, 'shsearcheng_txtidno'), 0, 10);
            $shsearcheng_txtlastname    = substr(getStdData($obj, 'shsearcheng_txtlastname'), 0, 25);
            $shsearcheng_txtfirstname   = substr(getStdData($obj, 'shsearcheng_txtfirstname'), 0, 25);

            include "registrar/regsstudsrcnow.php";
            break;
        case "afaupdreentstatus":
            $idno       = substr(getStdData($obj, 'idno'), 0, 10);
            $entstatus  = substr(getStdData($obj, 'entstatus'), 0, 5);

            include "afa/dml/afaupdreentstatus.php";                    
            break;
        case "ap4gradstats":
            include "registrar/reports/ap4gradstats.php";                    
            break;
        case "gncmainpage":
            include "gnc/index.php";                    
            break;
        case "updcntc":
            $nsid        = substr(getStdData($obj, 'nsid'), 0, 10);
            $relation    = substr(getStdData($obj, 'relation'), 0, 30);
            $callback   = substr(getStdData($obj, 'callback'), 0, 50);                    
            include "registrar/studtabs/contactinfoEdit.php";
            break;
        case "cntctifosave":                    
            include "registrar/studtabs/contactinfoSave.php";
            break;
        case "updperifo":
            $nsid        = substr(getStdData($obj, 'nsid'), 0, 10);
            $callback   = substr(getStdData($obj, 'callback'), 0, 50);                    
            include "registrar/studtabs/personalinfoEdit.php";
            break;
        case "perifosve":
            include "registrar/studtabs/personalInfoSave.php";
            break;
        case "updfaminfo":
            $recid      = substr(getStdData($obj, 'recid'), 0, 10);
            $relation   = substr(getStdData($obj, 'relation'), 0, 30);
            $callback   = substr(getStdData($obj, 'callback'), 0, 50);  
            include "registrar/studtabs/familyinfoEdit.php";
            break;
        case "fammembrsve":
            include "registrar/studtabs/faminfoInfoSave.php";
            break;
        case "hrdmainpage":
            include "hrd/index.php";
            break;
        case "hrdgteentrysched":
            include "hrd/gatechedencoding.php";
            break;
        case "hrdloadscheds":
            include "hrd/gatescheds.php";
            break;
        case "hrdsveeditgtesched":
            include "hrd/sveeditgtesched.php";
            break;
        case "usrmgrpage":
            include "applications/usermgr.php";
            break;
        case "usrmgrfindusr":
            $username = substr(getStdData($obj, 'username'), 0, 30);
            include "applications/usermgrsrchusr.php";
            break;
        case "genrpts":
            include "reports.php";
            break;
        case "queuereport":
            include "queuereport.php";
            break;
        case "myqueuegenrpts":
            include "myqueuereport.php";
            break;
        case "edrpreulpaymentmain":
            include "ederp/ederpreulpayments.php";
            break;
        case "edrpreulpaymentmainornosrc":
            $orno = substr(getStdData($obj, 'orno'), 0, 15);
            include "ederp/edrpreulpaymentmainornosrcss.php";
            break;
        case "edrpreulpaymentornopost":
            $orno       = substr(getStdData($obj, 'orno'), 0, 15);
            $orhash     = substr(getStdData($obj, 'orhash'), 0, 1000);
            $targettbl  = substr(getStdData($obj, 'targettbl'), 0, 20);
            include "ederp/edrpreulpaymentmainornoul.php";
            break;
        case "loadRef_idno":
            include "references.php";
            break;
        case "ftsgatelogtoday":
            include "fts/ftsgatelogtoday.php";
            break;
        case "adcentypechnge":
            include "afa/afaadconchngeenttype.php";
            break;
        case "credsrequirements":
            include "afa/afacredsrequirements.php";
            break;
        case "credreqdocreq": 
            include "afa/afasttycredreqmnts.php";
            break;
        case "credreqdocreqnew":
            include "afa/afasttycredreqmntsnew.php";
            break;
        case "credreqdocreqmods":
            include "afa/afasttycredreqmntsmod.php";
            break;
        case "dtsverifpage":
            $_SESSION['dtsodrid'] = substr(getStdData($obj, 'ordid'), 0, 20);
            include "registrar/dts/dtsverifpagee.php";
            break;
        case "dtsverifyapp":
            include "registrar/dts/dtsverifyapppage.php";
            break;
        case "remapplschoapp1":
            $recid = substr(getStdData($obj, 'recid'), 0, 10);
            $idno = substr(getStdData($obj, 'idno'), 0, 10);
            include docRoot."jq/feuapps/afa/studtabs/afaschoapp1remove.php";
            break;
        case "refs_institute":
            include docRoot."jq/feuapps/registrar/references/institutes.php";
            break;
        case "refs_institutechangeassper":
            $institute = substr(getStdData($obj, 'institute'), 0, 10);
            $assper = substr(getStdData($obj, 'assper'), 0, 25);    
            include docRoot."jq/feuapps/registrar/references/institutesupdassper.php";
            break;
        case "dtsdmlapdoc":
            include docRoot."jq/feuapps/registrar/dts/dts_delappdocreq.php";
            break;
        case "dtsadmrefresdocsappl":
            include docRoot."jq/feuapps/registrar/dts/dts_refreshdocsapplied.php";
            break;
        case "dtsdmlverifappl":
            include docRoot."jq/feuapps/registrar/dts/dts_verifyapplicant.php";
            break;
        case "dtsdmlstldd":
            $_SESSION['dtsodrid'] = substr(getStdData($obj, 'ordid'), 0, 20);
            include docRoot."jq/feuapps/registrar/dts/dts_chargeConfirmation.php";
            break;
        case "dtsapplinfo":
            include docRoot."jq/feuapps/registrar/dts/dts_applinfo.php";
            break;
        case "admprosuldcred":
            include docRoot."jq/feuapps/afa/afaadmprosuldcredss.php";
            break;
        case "admprosuldcrednwo":
            include docRoot."jq/feuapps/afa/afaadmprosuldcredssdlnow.php";
            break;
        case "admprosuldcredmdlnw":
            include docRoot."jq/feuapps/afa/afaadmprosuldcredsmkdldnw.php";
            break;
        case "admprosenreulnw":
            include docRoot."jq/feuapps/afa/afaadmprosenblreuldnow.php";
            break;
        case "admprossetaplresnw":
            include docRoot."jq/feuapps/afa/admprossetaplresnww.php";
            break;
        case "dtsadmmnltrac":
            include docRoot."jq/feuapps/registrar/dts/dts_mnltrack.php";
            break;
        case "dtsadmapplimpdes":
            include docRoot."jq/feuapps/registrar/dts/dts_aplntimpediments.php";
            break;
        case "dtsadmamldnsnw":
            include docRoot."jq/feuapps/registrar/dts/dts_aplntimpedimentnotifs.php";
            break;
        case "dtsadmqerpimpnw":
            include docRoot."jq/feuapps/registrar/dts/dts_aplntreqnotifsemlnw.php";
            break;
        case "dtsapplsiofdtsinfo":
            include docRoot."jq/feuapps/registrar/dts/dts_aplntsfeudata.php";
            break;
        case "dtsappdloedctinfno":
            include docRoot."jq/feuapps/registrar/dts/dts_aplnteductioninfo.php";
            break;
        case "mntsihlpdske":
            include docRoot."jq/feuapps/helpdesk/index.php";
            break;
        case "txthdkididno":
        case "txthdkebarringidno":    
            include docRoot."jq/feuapps/helpdesk/idnoinfo.php";
            break;
        case "hdtisdtaa":
            include docRoot."jq/feuapps/helpdesk/helpdeskdata.php";
            break;
        case "bnthdsrrtwwszzre":
            include docRoot."jq/feuapps/helpdesk/helpdeskazurerst.php";
            break;
        case "btnaccsoadm":
            include docRoot."jq/feuapps/edtech/index.php";
            break;
        case "acsddtdta":
            include docRoot."jq/feuapps/edtech/acosdata.php";
            break;
        case "btnpropdlnsdtaproc":
            include docRoot."jq/feuapps/property/prop1data.php";
            break;
        case "acsddtedxtea":
            include docRoot."jq/feuapps/edtech/acosdataexec.php";
            break;
        case "propdlnwre":
            include docRoot."jq/feuapps/property/propinvdataexec.php";
            break;
        case "mntsiidee":
            include docRoot."jq/feuapps/helpdesk/eidindex.php";
            break;
        case "txthdkeidididno":
            include docRoot."jq/feuapps/helpdesk/eidsdata.php";
            break;
        case "bjrneidaprrv":
            include docRoot."jq/feuapps/helpdesk/eidapprove.php";
            break;
        case "bjfeiddidsiaprv":
            include docRoot."jq/feuapps/helpdesk/eiddisapprove.php";
            break;
        case "finlhbkpttsd":
            include docRoot."jq/feuapps/finance/bnkholdindex.php";
            break;
        case "finbpmpose":
            include docRoot."jq/feuapps/finance/bankmpostindex.php";
            break;
        case "dlsnifflhptys":
            include docRoot."jq/feuapps/finance/bnkholddata.php";
            break;
        case "hdlptsmfi_":
            include docRoot."jq/feuapps/finance/bnkholdqueue.php";
            break;
        case "hdlptsmfnopi_":
            include docRoot."jq/feuapps/finance/bnkholdothaction.php";
            break;
        case "dtsmntckee":
            include docRoot."jq/feuapps/registrar/dts/dts_mtrack.php";
            break;
        case "dtsmnltramserch":
            include docRoot."jq/feuapps/registrar/dts/dts_mtrackserach.php";
            break;
        case "refs_doclists":
            include docRoot."jq/feuapps/registrar/dts/dts_doclists.php";
            break;
        case "refs_doclistsve":
            include docRoot."jq/feuapps/registrar/dts/dts_doclistsupd.php";
            break;
        case "fronoidcrate":
            include docRoot."jq/feuapps/registrar/dts/dts_foridnocreate.php";
            break;
        case "findtsforfoirdi":
            include docRoot."jq/feuapps/registrar/dts/dts_foridnocreateform.php";
            break;
        case "bntreqqsrmdel":
            include docRoot."jq/feuapps/afa/dml/deluploadedreqs.php";
            break;
        case "dtsactclrnces":
            include docRoot."jq/feuapps/registrar/dts/dts_acntclrourpuld.php";
            break;
        case "dtsactclrnrlddocsces":
            include docRoot."jq/feuapps/registrar/dts/dts_acntclrouuldedfrpuld.php";
            break;
        case "ldschapplgntmon":
            include docRoot."jq/feuapps/afa/afaschgntmon_data.php";
            break;
        case "DFIM094G":
            include docRoot."jq/feuapps/afa/afaschgntmon_datacont.php";
            break;
        case "RIFN983":
            include docRoot."jq/feuapps/afa/afaschgntmon_dml.php";
            break;
        case "finbpproff":
        case "finbpprtamshopoff":    
            include docRoot."jq/feuapps/finance/pops_index.php";
            break;
        case 'cbopopsnstat':
            include docRoot."jq/feuapps/finance/pops_content.php";
            break;
        case 'F938NWIEF':
            include docRoot."jq/feuapps/finance/pops_indvdta.php";
            break;
        case 'btnpopsdmadecline':
        case 'btnpopsdmampost':    
        case 'btnpopsdmamapost':    
        case 'btnpopsdmretpen':
        case 'btnpopsdmamsave':
        case 'tpdpoptnew':
        case 'dpopdemrem':
        case 'dpopdemupd':
        case 'dpopdemren':
        case 'mdpopapdtkdli':    
        case 'numpopxuln':
        case 'btnpopsdverifonly':    
            include docRoot."jq/feuapps/finance/pops_dml.php";
            break;
        case 'SDF93MFO':
        case 'OMSC9834':
            include docRoot."jq/feuapps/finance/bankmpostrequest.php";
            break;
        case '4FM093R':
            include docRoot."jq/feuapps/finance/bankmposreqpending.php";
            break;
        case 'DFN983RSD':
        case '93FSLKDF':
        case 'C9NUHJIASUD':
        case 'X093FRF':
        case 'FM9W83MJF':
            include docRoot."jq/feuapps/finance/bankmpostdmls.php";
            break;
        case '83MOIKDFS':
            include docRoot."jq/feuapps/finance/index.php";
            break;
        case '09MCOSIEJR':
            include docRoot."jq/feuapps/frmbasedreport.php";
            break;
        case 'SD890FMJ2':
            include docRoot."jq/feuapps/frmbasedreport_content.php";
            break;
        case 'SOIMFRSD':
            include docRoot."jq/feuapps/finance/pops_paypurp.php";
            break;
        case '90MF0S9EF':
            include docRoot."jq/feuapps/registrar/dts/dts_delappdocreq.php";
            break;
        case '9MFPAODFKE':
            include docRoot."jq/feuapps/registrar/regappforgradphotoapproval.php";
            break;
        case '209MFSOPDFK':
            include docRoot."jq/feuapps/registrar/regappforgradphotoapprovalidv.php";
            break;
        case '093MSODKoiJ3)(':
            include docRoot."jq/feuapps/registrar/regappforgradphotoapprovaldml.php";
            break;
        case '93MOOiMODI9':
            include docRoot."jq/feuapps/fts/ftslink.php";
            break;
        case '09mfngiaIUHSN87':
            include docRoot."jq/feuapps/afa/dml/afagendml.php";
            break;
        case '9W8EFJSFJOIW':
            include docRoot."jq/feuapps/afa/dml/afagendml.php";
            break;
        case '2MRWDFOWIJR':
            include docRoot."jq/feuapps/registrar/gendml.php";
            break;
        case '0MFSUHN8RG3EW':
            include docRoot."jq/feuapps/sd/gatebarring_index.php";
            break;                
        case 'SDFJ938TOAKD':
            include docRoot."jq/feuapps/sd/gatebarring_data.php";
            break;     
        case 'rabdtaedi':
        case 'rabbdtanew':    
            include docRoot."jq/feuapps/sd/gatebarring_ie.php";
            break;     
        case 'S93MOK092AD':
        case '4MRODFHIWU3H':    
            include docRoot."jq/feuapps/sd/gatebarring_dml.php";
            break;     
        case 'COAWIR834A':
            include docRoot."jq/feuapps/afa/afaschschoapptypes.php";
            break;
        case 'S09DJG5MGJO':
            include docRoot."jq/feuapps/afa/afaschnetype.php";
            break;
        case 'SODIFJQ34MF':
            include docRoot."jq/feuapps/afa/afaschnesave.php";
            break;
        case '9344FFAK':
            include docRoot."jq/feuapps/afa/afaschneregqs.php";
            break;
        case 'SD9F8MJ34IMF':
            include docRoot."jq/feuapps/afa/afaschnereqsetup.php";
            break;
        case 'AE084MJFIEJF':
            include docRoot."jq/feuapps/registrar/dts/dts_documentstatusstat.php";
            break;
        case 'btnpropdlnsdta':
            include docRoot."jq/feuapps/property/index.php";
            break;
        // <editor-fold defaultstate="collapsed" desc="BRYAN SD">
        case 'SDgat30ff3ns3s':
            $_SESSION['schyr'] = getStdData($obj, 'schyr');
            $_SESSION['sem'] = getStdData($obj, 'sem');
            $_SESSION['studno'] = getStdData($obj, 'studno');
            include docRoot."jq/feuapps/sd/gate_offenses.php";
            break;
        case "sdsearchoffense":
            $_SESSION['gatebarringidno'] = getStdData($obj, 'idno');
            $_SESSION['classtart'] = getStdData($obj, 'classtart');
            $_SESSION['classend'] = getStdData($obj, 'classend');
            include "sd/gatebarring_offenses.php";
            break;
        case 'sdbarringoffensesave':    
            include "sd/gatebarring_offenses_dml.php";
            break;        
        // </editor-fold>
        default:
                echo "<jsx>alert('Invalid ID');</jsx>";
                break;			
    }	 
}else{
	die("<jsx>location.reload();</jsx>");
} 
        