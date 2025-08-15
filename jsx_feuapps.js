// JavaScript Document

function loadreports(){
    obj  	= {'id':'genrpts'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);       
}
$(document).on('change', '#cborptsavail', function(){
    // hide all controls
    $("[id^=trvis_]").each(function(){
       if(!$(this).hasClass('w3-hide')){
           $(this).addClass('w3-hide');
       } 
    });
    
    lparams = $('option:selected', this).attr('data-params');
    larrParam = lparams.split(",");
    larrParam.forEach(function(e){
        try {
            $("#trvis_"+e.trim()).removeClass('w3-hide');
        } catch (ee) {            
        }
    });
    
    if(!$('#rptsbtngen').hasClass('w3-hide')){
        $('#rptsbtngen').addClass('w3-hide');
    }
    if($(this).val().trim().length>0){
        $('#rptsbtngen').removeClass('w3-hide');    
    }
});
function genreport(prprid){    
    obj = {};
    obj['id']   = 'queuereport';
    obj['rptid']= prprid;
    
    lparams = {};
    $("[id^=trvis_]:not('.w3-hide')").each(function(){
        lid = $(this).attr('data-inputid');
        lparams[lid] = getEncodedDOMval($('#'+lid).val());
    });
    
    obj['params'] = JSON.stringify(lparams);
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);     
}
function idrefreshmyperstrpts(){
    obj  	= {'id':'myqueuegenrpts'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'dvrptsmyqueue', null);    
}
$(document).on('change', "[id^=txtrptpar_]", function(){
    rptid               = getEncodedDOMval($('#cborptsavail').val());
    txtrptpar_idno      = getEncodedDOMval($('#txtrptpar_idno').val());
    txtrptpar_program   = getEncodedDOMval($('#txtrptpar_program').val());
    
    obj                     = {};
    obj['id']               = 'loadRef_idno';
    obj['rptid']            = rptid;
    obj['sourceCtrl']       = $(this).attr('id');;
    obj['txtrptpar_idno']   = txtrptpar_idno;
    obj['txtrptpar_program']= txtrptpar_program;
    
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);      
});    
$(document).on('keypress', "#txtrptpar_idno", function(e){
    if(e.which==13){
        $(this).trigger('change');
    }
});    

    
// PRE-ENR Activities
$(document).on('keypress', '#feuapps_preenractstat', function(e){
	if(e.which=='13'){
		idno = $(this).val();
		
		obj  	= {'id':'preenrcheckstatus', 'idno':idno};
								
		dbParam = JSON.stringify(obj);
		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'resultcntr_preenract', null);									 		
	}
});
$(document).on('click', '#btnpreenract', function(){
		obj  	= {'id':'preenract'};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);									 		
});
$(document).on('click', '#btnapprsldtaenc', function(){
		obj  	= {'id':'btnapprsldtaenc'};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);									 		
});
$(document).on('input', '#feuapps_preenractstat', function(){
	$('#resultcntr_preenract').html(' ');
});

// APPRAISAL DATA
$(document).on('change', '#cboapprdtatestnme', function(){
		testname	= $("#cboapprdtatestnme").val();
		idno		= $("#feuapps_txtidnoappdtaenc").val();
		
		obj  		= {'id':'cboapprdtatestnme','testname':testname, 'idno':idno};
		
		dbParam 	= JSON.stringify(obj);		
		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'divapprsldtatestquestions', null);									 		
});
$(document).on('keypress', '#feuapps_txtidnoappdtaenc', function(e){
	if(e.which=='13'){
		$("#cboapprdtatestnme").trigger("change");
	}
});
$(document).on('input', '#feuapps_txtidnoappdtaenc', function(){
	$("#divapprsldtatestquestions").html('');
	$('#pidnoapprsldta').html('');
});
$(document).on('change', "[data-apprslans='Y']", function(){
	recid 	= $(this).attr('data-ansrecid');
	pkey  	= $(this).attr('id');
	ans  	= $(this).val();
	idno	= $("#feuapps_txtidnoappdtaenc").val();
	
	obj  		= {'id':'saveans','recid':recid, 'pkey':pkey, 'ans':ans, 'idno':idno};
	
	dbParam 	= JSON.stringify(obj);		
	
	callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);									 		
});
$(document).on('click', '#btnapprslpost', function(){
	if(!confirm("Continue?")){return;}
	
	testname	= $("#cboapprdtatestnme").val();												   
	idno		= $("#feuapps_txtidnoappdtaenc").val();
	
	obj  		= {'id':'postans', 'idno':idno, 'testname':testname};
	
	dbParam 	= JSON.stringify(obj);		
	
	callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);									 		
});

// HELPDESK
$(document).on('click', '#btnhdrstcreds', function(){
		obj  	= {'id':'btnhdrstcreds'};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);													   
});
$(document).on('keypress', '#txthdgetentity', function(e){
	if(e.which=='13'){													   
		entid	= getEncodedDOMval($(this).val());
		obj  	= {'id':$(this).attr('id'), 'entid':entid};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'pentityname', null);	
	}
});
$(document).on('input', '#txthdgetentity', function(){
	$('#pentityname').html('');
	$('#btnhdrstpwdnw').attr('disabled',true);
});
$(document).on('click', '#btnhdrstpwdnw', function(){
	entid	= getEncodedDOMval($('#txthdgetentity').val());
	enttype	= $("#ienttype").attr('data-enttype');	
	
	if(entid.trim().length==0){
		alert('Student No., Username is required');
		return;
	}
	
	if(!confirm('Continue?')){return;}
	
	obj  	= {'id':$(this).attr('id'), 'entid':entid, 'enttype':enttype};								
	dbParam = JSON.stringify(obj);		
	callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);		
});
$(document).on('click', '#mntsihlpdske', function(){
    obj = {};
    obj['id'] = getEncodedDOMval($(this).attr('id'));
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);		    
});
$(document).on('change', '#txthdkididno', function(){
    obj = {};
    obj['id'] = getEncodedDOMval($(this).attr('id'));
    obj['idno'] = getEncodedDOMval($(this).val());
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'dvihdeksinfo', function(){lddhdddta();});
});
function lddhdddta(){
    obj = {};
    obj['id'] = 'hdtisdtaa';
    obj['idno'] = getEncodedDOMval($('#txthdkididno').val());
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'dvhddta', null);    
}
$(document).on('click', '#ddfreshdsdata', function(){
    idno = getEncodedDOMval($('#txthdkididno').val());
    
    if(idno.trim().length===0){
        $('#mntsrchiiid').trigger('click');
    }else{
        $('#txthdkididno').trigger('change');
    }        
});
$(document).on('click', '#bnthdsrrtwwszzre', function(){
    if(!confirm('Continue?')){return;}
    
    idno = getEncodedDOMval($('#txthdkididno').val());
    hash = getEncodedDOMval($(this).attr('data-hash'));
    
    obj = {};
    obj['id'] = getEncodedDOMval($(this).attr('id'));
    obj['idno'] = idno;
    obj['hash'] = hash;
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', function(){lddhdddta();});    
});

$(document).on('click', '#mntsiidee', function(){
    obj = {};
    obj['id'] = getEncodedDOMval($(this).attr('id'));
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);		    
});
$(document).on('change', '#txthdkeidididno, #txthdkebarringidno', function(){
    obj = {};
    obj['id'] = getEncodedDOMval($(this).attr('id'));
    obj['idno'] = getEncodedDOMval($(this).val());
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'dvihdeksinfeweido', function(){
        if(obj['id']==='txthdkebarringidno'){
            $('#facbarrefresh').trigger('click');
        }
    });    
});
$(document).on('click', '#eidffrdhrefs', function(){
    $('#txthdkeidididno').trigger('change');
});
$(document).on('click', '#dleidapvrd', function(){
    $('#uldstattseid').trigger("click");
});
function lmeidsndmll(){
    $('#txthdkeidididno').trigger('change');
}
$(document).on('click', '#bjrneidaprrv', function(){
    if(!confirm('Continue?')){return;}
    obj = {};
    obj['id'] = getEncodedDOMval($(this).attr('id'));
    obj['idno'] = getEncodedDOMval($('#txthdkeidididno').val());
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);        
});
$(document).on('click', '#bjfeiddidsiaprv', function(){
    if(!confirm('Continue?')){return;}
    obj = {};
    obj['id'] = getEncodedDOMval($(this).attr('id'));
    obj['idno'] = getEncodedDOMval($('#txthdkeidididno').val());
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);        
});

// afa
function loadappltdledfiles(){	
    if($('#chkloaddownledfilesalso').is(':checked')){
		lddledfle = 'Y';
		$('#btnld200more').show();
		console.log('Y');
	}else{
		lddledfle = 'N';
		$('#btnld200more').hide();
		console.log('N');
	}	
}
$(window).on('scroll', '#divappllist1', function(){ 
	/* if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight()) { 		
		alert('debug breakpoint 1'); 
	} 
	+' : '+$(this).innerHeight()+' : '+$(this).scrollHeight()
	
	*/
	console.log('scroll event fired');
});
function loadafamain(id){
		obj  	= {'id':id};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);	
}
$(document).on('click', '#btnafatools', function(){
	loadafamain('btnafatools');
});

$(document).on('click', '#divafapreenrdata', function(){
		obj  	= {'id':$(this).attr('id')};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);														  
});

$(document).on('input', '#txtafapreenradconno', function(){
	$('#divafapreenrdata1').html('');
});
function loadafapreenradcon(){
		adconno	= getEncodedDOMval($('#txtafapreenradconno').val());
		
		obj  	= {'id':'txtafapreenradconno', 'adconno':adconno};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'divafapreenrdata1', null);	
}
$(document).on('keypress', '#txtafapreenradconno', function(e){
	if(e.which=='13'){
		loadafapreenradcon();
	}
});
$(document).on('click', '#lblafareqdlall', function(){
		adconno	= getEncodedDOMval($(this).attr('data-adconno'));
		obj  	= {'id':$(this).attr('id'), 'adconno':adconno};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);	
													
});
$(document).on('click', '#divafaupldreqs', function(){
		obj  	= {'id':$(this).attr('id')};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);														
});

function loadapplicant123(){
	adconno = getEncodedDOMval($('#txtadconno').val());
	appname = getEncodedDOMval($('#txtapplicantname').val());
        
	if($('#chkloadschoapponly').is(':checked')){
		schonly = 'Y';
	}else{
		schonly = 'N';
	}	
	newOnly = $('#tabdtatoloadbew').is(':checked')?'Y':'N';  
        reEntry = $('#chkloadreentry').is(':checked')?'Y':'N';
        
	obj  	= {'id':'loadapplist', 'adconno':adconno, 'appname':appname, 'schonly':schonly, 'newOnly':newOnly, 'reEntry':reEntry, 'dreqid':dreqid};
	dbParam = JSON.stringify(obj);		
	callServerPOST(dbParam, "jq/feuapps/gway.php", 'divappllist1', null);
}
$(document).on('keypress', '#txtadconno, #txtapplicantname', function(e){
	if(e.which=='13'){
		loadapplicant123();
	}
});
$(document).on('click', '#afadoccntrrst', function(){
	if(!confirm('Continue?')){return;}
	recid = getEncodedDOMval($(this).attr('data-recid'));
	
	obj  	= {'id':'afadoccntrrst', 'recid':recid};								
	dbParam = JSON.stringify(obj);		
	callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});
$(document).on('change', '#chkloadschoapponly', function(){
	loadapplicant123();
});

$(document).on('click', "[id^='schqualrecid_']", function(){
	recid 		= $(this).attr('data-recid');
	qualified 	= $(this).attr('data-qualified');
	ctrlid		= $(this).attr('id');

	obj  	= {'id':'updsetqualstat', 'recid':recid, 'qualified':qualified, 'ctrlid':ctrlid};								
	dbParam = JSON.stringify(obj);		
	callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});
function toggleschqualrecind(ctrlid, recid){
	$("[id^='schqualrecid_"+recid+"']").removeClass('fa fa-check-square-o');
	$("[id^='schqualrecid_"+recid+"']").removeClass('fa fa-square-o');
	$("[id^='schqualrecid_"+recid+"']").addClass('fa fa-square-o');
	
	$('#'+ctrlid).removeClass('fa fa-square-o');
	$('#'+ctrlid).addClass('fa fa-check-square-o');	
}
function ldschapplschd(){
    obj  	= {'id':'ldschapplschd'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);
}
$(document).on('change', "[name^='dtpsch_s_'], [name^='dtpsch_e_']", function(){
    schtype = $(this).attr('data-schtype');
    fld     = $(this).attr('data-fld');
    val     = $(this).val();

    obj  	= {'id':'updschtpedte', 'schtype':schtype, 'fld':fld, 'val':val};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});

$(document).on('change', '#cboreentrystatus', function(){
    if(!confirm('Continue?')){return;}
    entstatus   = $(this).val();
    idno        = $('#hdnidno').val();
    
    obj  	= {'id':'afaupdreentstatus', 'idno':idno, 'entstatus':entstatus};
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);      
});

var dreqid = '';
$(document).on('click', "[data-afatabss='REQ']", function(){
    $("[data-afatabss='REQ']").removeClass('w3-teal');
    $("[data-afatabss='REQ']").addClass('w3-flat-midnight-blue');
/*            
    $('#tabbtnnewuploads').removeClass('w3-teal');
    $('#tabbtndownloaded').removeClass('w3-teal');
    $('#tabbtnnewuploads').addClass('w3-flat-midnight-blue');
    $('#tabbtndownloaded').addClass('w3-flat-midnight-blue');    
*/    
    $(this).addClass('w3-teal');
    
    if($(this).attr('id') === 'tabbtnnewuploads'){
        $('#tabdtatoloadbew').prop('checked', true);
    }else if($(this).attr('id') === 'tabbtndownloaded'){
        $('#tabdtatoloadbew').prop('checked', false);        
    }
    
    dreqid = $(this).attr('id');
    
    loadapplicant123();
});
$(document).on('change' , '#cboaplntestat', function(){
    adcon       = getEncodedDOMval($('#txtafapreenradconno').val());
    newetype    = getEncodedDOMval($(this).val());
    
    if(!confirm('Continue?')){return;}
    
    obj = {};
    obj['id'] = 'adcentypechnge';
    obj['adcon'] = adcon;
    obj['newetype'] = newetype;
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);      
});
function loadcredsrequiremets(){
    obj  	= {'id':'credsrequirements'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);    
}
function loaddocreqssdw(){
    obj = {};
    obj['id'] = 'credreqdocreq';
    obj['sttycode'] = getEncodedDOMval($('#cbocredsreqsdocs').val());
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'divredreqsmets', null);        
}
$(document).on('change', '#cbocrednewdocreq', function(){
    if(!confirm('Continue?')){return;}
    obj = {};
    obj['id'] = 'credreqdocreqnew';
    obj['sttycode'] = getEncodedDOMval($('#cbocredsreqsdocs').val());
    obj['doccode'] = getEncodedDOMval($(this).val());
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);        
});
$(document).on('change', '#cboentdocreqstatuschange', function(){
    if(!confirm('Continue?')){return;}
    obj = {};
    obj['id'] = 'credreqdocreqmods';
    obj['sttycode'] = getEncodedDOMval($(this).attr('data-sttycode'));
    obj['doccode'] = getEncodedDOMval($(this).attr('data-doccode'));
    obj['status'] = getEncodedDOMval($(this).val());
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);        
});

$(document).on('click', "[name^='schoapp1dtsl_']", function(){
    if(!confirm('Continue?')){return;}
    
    id = getEncodedDOMval($(this).attr('data-recid'));
    idno = getEncodedDOMval($(this).attr('data-idno'));
    
    obj = {};
    obj['id'] = 'remapplschoapp1';
    obj['recid'] = id;
    obj['idno'] = idno;
    
    dbParam = JSON.stringify(obj);		

    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});
$(document).on('click', '#loadprosuldcred', function(){    
    obj = {};
    obj['id'] = 'admprosuldcred';
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);       
});
$(document).on('click', '#btndlproscredulds', function(){
    hash = getEncodedDOMval($(this).attr('data-hash'));
    email = getEncodedDOMval($(this).attr('data-email'));
    
    obj = {};
    obj['id'] = 'admprosuldcrednwo';
    obj['email'] = email;
    obj['hash'] = hash;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);           
});
$(document).on('click', '#btndlproscredulddwldd', function(){
    if(!confirm('Continue?')){return;}
    hash = getEncodedDOMval($(this).attr('data-hash'));
    email = getEncodedDOMval($(this).attr('data-email'));
    
    obj = {};
    obj['id'] = 'admprosuldcredmdlnw';
    obj['email'] = email;
    obj['hash'] = hash;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);               
});
$(document).on('click', '#btnprosstudenrul', function(){
    if(!confirm('Continue?')){return;}
    hash = getEncodedDOMval($(this).attr('data-hash'));
    email = getEncodedDOMval($(this).attr('data-email'));
    
    obj = {};
    obj['id'] = 'admprosenreulnw';
    obj['email'] = email;
    obj['hash'] = hash;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);               
});
$(document).on('change', '#cboprosapplreslt', function(){
    if(!confirm('Continue?')){return;}
    hash = getEncodedDOMval($(this).attr('data-hash'));
    adconno = getEncodedDOMval($(this).attr('data-adconno'));
    result = getEncodedDOMval($(this).val());
    
    obj = {};
    obj['id'] = 'admprossetaplresnw';
    obj['adconno'] = adconno;
    obj['hash'] = hash;
    obj['result'] = result;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                   
});
$(document).on('click', '#bntreqqsrmdel', function(){
    if(!confirm('Continue?')){return;}
    
    sdte = getEncodedDOMval($('#txtulstdte').val());
    edte = getEncodedDOMval($('#txtuleddte').val());
    
    obj = {};
    obj['id'] = 'bntreqqsrmdel';
    obj['sdte'] = sdte;
    obj['edte'] = edte;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);               
});

// applications
var autorfs = 0;
var intInterval1 = 0;
var ival = 10000;
function autorefreshappdev(){
	$('#slidtimeout').val(ival);
	$('#slidtimeout_displ').html(ival/1000);
	if(autorfs==1){	
		if(intInterval1>0){
			clearInterval(intInterval1);
			intInterval1 = 0;			
		}	
		intInterval1 = setTimeout(function(){loadappdevfac('btnappdevtm');}, ival);
	}
}
function setuptoggle(){
	if(autorfs==0){ // intInterval1
			$('#chkappdevautorefresh').removeClass('fa fa-check-square-o');
			$('#chkappdevautorefresh').addClass('fa fa-square-o');
			// $('#slidtimeout').attr('disabled', true);
	}else{
			$('#chkappdevautorefresh').removeClass('fa fa-square-o');
			$('#chkappdevautorefresh').addClass('fa fa-check-square-o');		
			// $('#slidtimeout').attr('disabled', false);
	}
}
function loadappdevfac(pid){
    obj  	= {'id':pid};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);	
}
$(document).on('mouseup', '#slidtimeout', function(){	
	ival = $('#slidtimeout').val();
	$('#slidtimeout_displ').html(ival/1000);
});
$(document).on('touchend', '#slidtimeout', function(){	
	ival = $('#slidtimeout').val();
	$('#slidtimeout_displ').html(ival/1000);
});
$(document).on('input', '#slidtimeout', function(){
	$('#slidtimeout_displ').html($('#slidtimeout').val()/1000);
});

$(document).on('click', '#chkappdevautorefresh', function(){
/*														  
	if(intInterval1==0){
			intInterval1 = setInterval(function(){loadappdevfac('btnappdevtm');}, 10000);
	}else{
			clearInterval(intInterval1);
			intInterval1 = 0;
	} */
	if(autorfs == 0){
		autorfs = 1;
		loadappdevfac('btnappdevtm');
	}else{
		autorfs = 0;
		setuptoggle();
		if(intInterval1>0){
			clearInterval(intInterval1);
			intInterval1 = 0;			
		}		
	}
});
$(document).on('click', '#btnappdevtm', function(){
	loadappdevfac($(this).attr('id'));
});
$(document).on('click', '#btnlegsysmonsmail', function(){
	if(!confirm('This will send email notification to the group. Continue?')){return;}													   
	obj  	= {'id':$(this).attr('id')};								
	dbParam = JSON.stringify(obj);		
	callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);	
});
$(document).on('click', '#divacocanvasexec', function(){
	if(!confirm('Continue?')){return;}													   
	obj  	= {'id':$(this).attr('id')};								
	dbParam = JSON.stringify(obj);		
	callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);	
});
$(document).on('click', '#btndirmdoe', function(){
    obj  	= {'id':'usrmgrpage'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);     
});
$(document).on('keypress', '#txtumgr_username', function(e){
    if(e.which===13){
        lusername = getEncodedDOMval($(this).val());
        
        obj  	= {'id':'usrmgrfindusr', 'username':lusername};								
        dbParam = JSON.stringify(obj);		
        callServerPOST(dbParam, "jq/feuapps/gway.php", 'USRMGRUSRDTL', null);     
    }
});
function ederp_reulpayment(){
    obj  	= {'id':'edrpreulpaymentmain'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);    
}
function ederpsrcorno(porno){
        orno    = porno;

        obj  	= {'id':'edrpreulpaymentmainornosrc', 'orno':orno};								
        dbParam = JSON.stringify(obj);		
        callServerPOST(dbParam, "jq/feuapps/gway.php", 'ederpreulordtls', null);                    
}
$(document).on('keypress', '#ederpreulorno', function(e){
    if(e.which===13){
        orno = getEncodedDOMval($(this).val());
        ederpsrcorno(orno);        
    }
});
$(document).on('input', '#ederpreulorno', function(e){
    $('.lbldata').html('');    
});
$(document).on('click', '#btnederpreulor', function(){
    if(!confirm('Continue?')){return;}
    orno        = getEncodedDOMval($('#ederpreulorno').val());
    orhash      = getEncodedDOMval($('#tbledrpreulorno').attr('data-hash'));
    targettbl   = getEncodedDOMval($('#tbledrpreulorno').attr('data-ederpreultargttble'));
    
    obj  	= {'id':'edrpreulpaymentornopost', 'orno':orno, 'targettbl':targettbl, 'orhash':orhash};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'ederpreulordtls', null);                    
});

// feu cavite
function loadcavitemain(pid){
		obj  	= {'id':pid};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);													  	
}
$(document).on('click', '#btnfeucavite', function(){
		loadcavitemain($(this).attr('id'));
});
$(document).on('click', '#btncaviteadmnewapplicants', function(){
		obj  	= {'id':$(this).attr('id')};								
		dbParam = JSON.stringify(obj);		
		callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);													  
});

// REGISTRAR
function loadregsmainpage(){
    obj  	= {'id':'regsmainpage'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);   
}
function loadsdata(pidno){
    obj  	= {'id':'regsstuddata', 'idno':pidno};
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);       
}
function loadrefinstitutes(){
    obj  	= {'id':'refs_institute'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);       
}
$(document).on('click', '#refs_institute', function(){
    loadrefinstitutes();
});
$(document).on('change', '#cborefsintituteassper', function(){
    obj = {};
    obj['id'] = 'refs_institutechangeassper';
    obj['institute'] = getEncodedDOMval($(this).attr('data-institute'));
    obj['assper'] = getEncodedDOMval($(this).val());
    
    dbParam = JSON.stringify(obj);	
    console.log(dbParam);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);       
});
$(document).on('click', "[id^='refs_doclists']", function(){
    obj = {};
    
    obj['id'] = 'refs_doclists';
    obj['idsdr'] = $(this).attr('id');
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);    
});
$(document).on('change', "[id^='dtsdcclts_']", function(){
    obj = {};
    
    obj['id'] = 'refs_doclistsve';
    obj['idsdr'] = $(this).attr('id');
    obj['itdfl'] = $(this).attr('data-doccode');
    obj['ival'] = $(this).val();
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});
function dtsserlloed(){
    $('#refs_doclists').trigger('click');
};

// guidance
function loadgncmainpage(){
    obj  	= {'id':'gncmainpage'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);       
}
function loadcounselnotes(){
    obj  	= {'id':'gnccnslntes'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);           
}
function loadapprsldta(){
    obj  	= {'id':'gncaprsldta'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);           
}
function loadstarprog(){
    obj  	= {'id':'gncstarprog'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);           
}

//hrd
function loadhrdmainpage(){
    obj  	= {'id':'hrdmainpage'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);      
}
function gteenrysched(){
    obj  	= {'id':'hrdgteentrysched'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);          
}
function loadscheds(){
    obj  	= {'id':'hrdloadscheds'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'hrdgatescheds', null);              
}
$(document).on('change', "[id^=hrdgtsched_]", function(){
    recid   = $(this).attr('data-recid');
    wday    = $(this).attr('data-weekday');
    chk     = $(this).is(':checked')?'Y':'N';

    obj         = {};
    obj['id']   = 'hrdsveeditgtesched';
    obj['recid']= recid;
    obj['wday'] = wday;
    obj['chk']  = chk;
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);              
});

// FTS
function loadgatelogstoday(psort){
    obj  	= {'id':'ftsgatelogtoday', 'sort':psort};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);     
}

//DTS
function godtsverification(ordid=''){
    obj = {};
    obj['id'] = 'dtsverifpage';
    obj['ordid'] = ordid;
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);  
}
function dtsverifyapp(trackingcode, subsrc){
    obj = {};
    obj['id'] = 'dtsverifyapp';
    obj['trackingcode'] = getEncodedDOMval(trackingcode);
    obj['subsrc'] = getEncodedDOMval(subsrc);
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);  
}
$(document).on('click', "[id='dtsdelapdoc']", function(){
    if(!confirm('Continue?')){return;}

    doccode = getEncodedDOMval($(this).attr('data-doccode'));
    appno = getEncodedDOMval($(this).attr('data-appno'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['doccode'] = doccode;        
    obj['appno'] = appno;        
    obj['trackingcode'] = trackingcode;       
    obj['dml'] = 'd';        
    obj['hsid'] = hsid;        
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', function(){
        openForm('Contact Applicant Thru Email','50%',showmailer(doccode,'DTSDOCREM'));
    });    
});
$(document).on('change', "[id='cbodtsourchgqunatity']", function(){
    if(!confirm('Continue?')){return;}

    doccode = getEncodedDOMval($(this).attr('data-doccode'));
    appno = getEncodedDOMval($(this).attr('data-appno'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    quantity = getEncodedDOMval($(this).val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['doccode'] = doccode;        
    obj['appno'] = appno;        
    obj['trackingcode'] = trackingcode;       
    obj['quantity'] = quantity;
    obj['dml'] = 'u';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);        
});
$(document).on('click', "#btndtsouradditmsave", function(){
    if(!confirm('Continue?')){return;}

    doccode = getEncodedDOMval($('#cbodtsouradditmdoccode').val());
    appno = getEncodedDOMval($(this).attr('data-appno'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    quantity = getEncodedDOMval($('#cbodtsouradditmquantity').val());
    noofpages = getEncodedDOMval($('#cbodtsouradditmnoofpages').val());
    remarks = getEncodedDOMval($('#cbodtsouradditmremarks').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['doccode'] = doccode;        
    obj['appno'] = appno;        
    obj['trackingcode'] = trackingcode;       
    obj['quantity'] = quantity;
    obj['noofpages'] = noofpages;
    obj['dml'] = 'i';        
    obj['hsid'] = hsid;
    obj['remarks'] = remarks;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);        
});
$(document).on('change', '#dtsourchangeinstitute', function(){
    institute = getEncodedDOMval($(this).val());
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    appno = getEncodedDOMval($(this).attr('data-appno'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['institute'] = institute;
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'inst';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);            
});
$(document).on('change', '#dtsourchangeprogram', function(){
    program = getEncodedDOMval($(this).val());
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    appno = getEncodedDOMval($(this).attr('data-appno'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['program'] = program;
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'prog';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);            
});
$(document).on('change', '#cbodtscouriercode', function(){
    couriercode = getEncodedDOMval($(this).val());
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    appno = getEncodedDOMval($(this).attr('data-appno'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['couriercode'] = couriercode;
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'couriercode';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                
});
$(document).on('change', '#numcrmoat', function(){
    couriercode = getEncodedDOMval($(this).val());
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    appno = getEncodedDOMval($(this).attr('data-appno'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['couriercode'] = couriercode;
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'couermfee';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                
});
$(document).on('change', '#cbodtsdeloptadmchnge', function(){
    delopt = getEncodedDOMval($(this).val());
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    appno = getEncodedDOMval($(this).attr('data-appno'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['delopt'] = delopt;
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'delopt';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', function(){dllddtscards();});                    
});
$(document).on('change', "[id='cbodtsourchgnoofpages']", function(){
    noofpages = getEncodedDOMval($(this).val());
    appno = getEncodedDOMval($(this).attr('data-appno'));
    doccode = getEncodedDOMval($(this).attr('data-doccode'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['noofpages'] = noofpages;
    obj['appno'] = appno;
    obj['doccode'] = doccode;
    obj['trackingcode'] = trackingcode;
    obj['dml'] = 'dtschngadmnoocopy';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                        
});
$(document).on('change', "[id='cbodtsourchgftime']", function(){
    fitme = getEncodedDOMval($(this).val());
    appno = getEncodedDOMval($(this).attr('data-appno'));
    doccode = getEncodedDOMval($(this).attr('data-doccode'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['fitme'] = fitme;
    obj['appno'] = appno;
    obj['doccode'] = doccode;
    obj['trackingcode'] = trackingcode;
    obj['dml'] = 'dtschngadmftime';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                        
});
function dtsrefreshdoclists(appno, trackingcode){
    
    obj = {};
    obj['id'] = 'dtsadmrefresdocsappl';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;    
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'divdtsadmdocsreqs', null);
}
$(document).on('change', '#tsdidno', function(){
    if(!confirm('Continue?')){return;}
    
    idno = getEncodedDOMval($(this).val());
    appno = getEncodedDOMval($(this).attr('data-appno'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['idno'] = idno;
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    obj['dml'] = 'dtsupdidno';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', function(){fdata();lamddsteucddlo();gtimpdes(trackingcode);});                            
});
$(document).on('click', '#dtsadmcancelapp', function(){
    if(!confirm('Continue?')){return;}
    
    appno = getEncodedDOMval($(this).attr('data-appno'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['dml'] = 'dtsremapp';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;    
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "gway.php", '', null);                                
});


$(document).on('click', '#dtsadmvrifd', function(){
    if(!confirm('Continue?')){return;}
    
    appno = getEncodedDOMval($(this).attr('data-appno'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));    
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlverifappl';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;     
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                                    
});
function ldlst(lid){ // chargeConfirmation
    obj = {};
    obj['id'] = 'dtsdmlstldd';        
    obj['lid'] = lid;        
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);                                        
}
function ldlst_odr(lid, ordid){ // chargeConfirmation
    obj = {};
    obj['id'] = 'dtsdmlstldd';        
    obj['lid'] = lid;   
    obj['ordid'] = ordid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);                                        
}
function chargeinfo(trackingcode){
    obj = {};
    obj['id'] = 'dtsapplinfo';
    obj['subscr'] = 'chargeconfirm';
    obj['trackingcode'] = trackingcode;
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);      
}
$(document).on('click', '#btnadmdtsreview', function(){
    if(!confirm('Continue?')){return;}
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    appno = getEncodedDOMval($(this).attr('data-appno'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmbkverif';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                    
});
$(document).on('click', '#btnadmdtschrgconfrimed', function(){
    if(!confirm('Continue?')){return;}
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    appno = getEncodedDOMval($(this).attr('data-appno'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmconfmchnw';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                    
});
$(document).on('click', '#btndtspopcancel', function(){
    if(!confirm('Continue?')){return;}
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    recid = getEncodedDOMval($(this).attr('data-recid'));
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmcancelpop';        
    obj['hsid'] = hsid;
    obj['poprecid'] = recid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});
$(document).on('click', '#btndtspopaprvve', function(){
    if(!confirm('Continue?')){return;}
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    recid = getEncodedDOMval($(this).attr('data-recid'));
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmapprvveepop';        
    obj['hsid'] = hsid;
    obj['poprecid'] = recid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});
$(document).on('change', '#cbodtsadmdoccngstatus', function(){
    if(!confirm('Continue?')){return;}
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    doccode = getEncodedDOMval($(this).attr('data-doccode'));
    statusid = getEncodedDOMval($(this).val());
    remarkid = getEncodedDOMval($(this).attr('data-remarks'));
    remark = getEncodedDOMval($('#'+remarkid).val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmappchgndocstat';        
    obj['hsid'] = hsid;
    obj['doccode'] = doccode;
    obj['statusid'] = statusid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam+'&remark='+remark, "jq/feuapps/gway.php", '', null);        
});
$(document).on('blur', "[id^='btndtsadmstdocrmrks']", function(){
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    doccode = getEncodedDOMval($(this).attr('data-doccode'));
    remark = getEncodedDOMval($(this).val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmappsetdocrems';        
    obj['hsid'] = hsid;
    obj['doccode'] = doccode;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam+'&remark='+remark, "jq/feuapps/gway.php", '', null);            
});
$(document).on('click', '#dtsadmfrcorier', function(){
    if(!confirm('Continue?')){return;}
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmapprvvfordelivery';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);       
});
$(document).on('click', '#btnadmrtntopay', function(){
    if(!confirm('Continue?')){return;}
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmsetbcktpay';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);           
});
$(document).on('click', '#btnadmapplcomplete', function(){
    if(!confirm('Continue?')){return;}
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    ctrackcode = getEncodedDOMval($('#courtrackcode').val()); 
    courpartner = getEncodedDOMval($('#courpartner').val()); 
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmprocscomplete';        
    obj['hsid'] = hsid;
    obj['ctrackcode'] = ctrackcode;
    obj['courpartner'] = courpartner;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);           
});
$(document).on('keypress', '#txtdtsmnltrck', function(e){
    if(e.which===13){
        trackingcode = getEncodedDOMval($(this).val());
        
        obj = {};
        obj['id'] = 'dtsadmmnltrac';        
        obj['trackingcode'] = trackingcode;
        
        dbParam = JSON.stringify(obj);
        callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);           
    }
});
function gtimpdes(trackingcode){
    obj = {};
    obj['id'] = 'dtsadmapplimpdes';
    obj['trackingcode'] = getEncodedDOMval(trackingcode);
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'divdtsadmimpeds', null);          
}
$(document).on('click', '#btndtsamdsndmlnw', function(){
    if(!confirm('Continue?')){return;}
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    obj = {};
    obj['id'] = 'dtsadmamldnsnw';
    obj['trackingcode'] = getEncodedDOMval(trackingcode);
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);              
});
$(document).on('click', "[id^='ntfdnsqernw_']", function(){
    if(!confirm('Continue?')){return;}
    
    reqcode = getEncodedDOMval($(this).attr('data-reqcode'));
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    
    obj = {};
    obj['id'] = 'dtsadmqerpimpnw';
    obj['trackingcode'] = trackingcode;
    obj['reqcode'] = reqcode;
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);              
});
$(document).on('change', "[id^='txtadmdtsoronsve_']", function(){    
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    recid = getEncodedDOMval($(this).attr('data-recid'));
    lroon = getEncodedDOMval($(this).val());
    
    obj = {};
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['id'] = 'dtsdmlapdoc';        
    obj['dml'] = 'dtsdmlapvserono'; 
    obj['poprecid'] = recid;
    obj['hsid'] = hsid;
    obj['lroon'] = lroon;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});
$(document).on('click', "#btnadmdtssveornmlntiff", function(){
    if(!confirm('Continue?')){return;}
    
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['id'] = 'dtsdmlapdoc';        
    obj['dml'] = 'dtsdmlymtttifmle'; 
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});
function fdata(){
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    
    obj = {};
    obj['id'] = 'dtsapplsiofdtsinfo';
    obj['trackingcode'] = trackingcode;
    
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'divfdtsdta', null);      
}
function lamddsteucddlo(){
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    
    obj = {};
    obj['id'] = 'dtsappdloedctinfno';
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'divdtsadmedcbgg', null);      
}
$(document).on('click', '#btndtscncelcencel', function(){
    if(!confirm('Continue?')){return;}
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    recid = getEncodedDOMval($(this).attr('data-recid'));
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmcancelcancelpop';        
    obj['hsid'] = hsid;
    obj['poprecid'] = recid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});
function dllddtscards(){
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    appno = getEncodedDOMval($('#txtappno').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;        
    obj['dml'] = 'dtsadmdlldcsdrad';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'divdtsdeliveryaddress', null);    
}
$(document).on('click', '#dtsmntckee', function(){
    dtsogktactt();
});
function dtsogktactt(){
    obj = {};
    obj['id'] = 'dtsmntckee';
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);          
}
$(document).on('click', '#dtsmnltramserch', function(){
    obj = {};
    obj['id'] = getEncodedDOMval($(this).attr('id'));
    obj['dtsmnltratrackingcode'] = getEncodedDOMval($("#dtsmnltratrackingcode").val());
    obj['dtsmnltratxtlastname'] = getEncodedDOMval($("#dtsmnltratxtlastname").val());
    obj['dtsmnltratxtfirstname'] = getEncodedDOMval($("#dtsmnltratxtfirstname").val());
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'vddtstakrcsres', null);          
});
$(document).on('keypress', '#dtsmnltratrackingcode, #dtsmnltratxtlastname, #dtsmnltratxtfirstname', function(e){
    if(e.which===13){
        $("#dtsmnltramserch").trigger('click');
    }
});
$(document).on('click', "[id^='dtsmnltkrcldnw_']", function(){
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));

    obj = {};
    obj['id'] = 'dtsadmmnltrac';        
    obj['trackingcode'] = trackingcode;

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);               
});
$(document).on('click', "#fronoidcrate", function(){
    if(!confirm('Continue?')){return;}
    
    refno = prompt("Please enter Student No. reference year");
    obj = {};
    obj['id'] = getEncodedDOMval($(this).attr('id'));
    obj['txthdid'] = getEncodedDOMval($("#txthdid").val());
    obj['txttrackingcode'] = getEncodedDOMval($("#txttrackingcode").val());
    obj['txtappno'] = getEncodedDOMval($("#txtappno").val());
    obj['refno'] = getEncodedDOMval(refno);
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);      
});
$(document).on('click', '#findtsforfoirdi', function(){
    obj = {};
    obj['id'] = getEncodedDOMval($(this).attr('id'));
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);          
});
$(document).on('change', "[id^='dtsletsindooown_']", function(){
    idno = getEncodedDOMval($(this).val());
    appno = getEncodedDOMval($(this).attr('data-appno'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    hsid = getEncodedDOMval($(this).attr('data-hsid'));
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['idno'] = idno;
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    obj['dml'] = 'dtsupdidno';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});
$(document).on('change', "[id^='dtsiicrgtednnw']", function(){
    appno = getEncodedDOMval($(this).attr('data-appno'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    hsid = getEncodedDOMval($(this).attr('data-hsid'));
    lchecked = $(this).is(":checked")?'C':'Y';
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    obj['dml'] = 'dtsupdidnoforerdde';
    obj['hsid'] = hsid;
    obj['lchecked'] = lchecked;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});

// EDTECH
var acosllmmt = 0;
var acosllmmtaut = false;
$(document).on('click', '#btnaccsoadm', function(){
    obj = {};
    obj['id'] = $(this).attr('id');        
    
    acosllmmtaut=false;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', function(){acsoo();});        
});
function acsoo(){
    obj = {};
    obj['id'] = 'acsddtdta';        
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'acosdltasts', null);            
}
$(document).on('click', '#iiccossffrd', function(){    
    acttmmrcooldds();
});
$(document).on('click', '#btnccogendtadl', function(){
    if(!confirm('Continue?')){return;}
    
    obj = {};
    obj['id'] = 'acsddtedxtea';        
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                
});
function acttmmrcooldds(){
    if(acosllmmt===0){
        lint = $('#acosrffintlav').val();
        acsoo();
        acosllmmtaut = true;
        acosllmmt = setInterval(function(){
                               if($('#iiccossffrd').length===0 || !acosllmmtaut){
                                   clearInterval(acosllmmt);
                                   acosllmmt = 0;
                               }else{
                                   acsoo();
                               }
                    }, lint);
    }
}

// FI
$(document).on('click', '#btnpopsdmadecline, #btnpopsdmampost, #btnpopsdmamapost, #btnpopsdmretpen, #btnpopsdmamsave, #btnpopsdverifonly', function(){
    obj = {};
    obj['id'] = $(this).attr('id');        
    obj['recid'] = $(this).data('recid');
    obj['hash'] = $(this).data('hash');
    obj['idno'] = $(this).data('idno');
    obj['remarks'] = getEncodedDOMval($('#txtpopcmrmras').val());
    obj['orno'] = getEncodedDOMval($('#txtpopcmrmrorno').val());
    obj['srpstat'] = getEncodedDOMval($('#lblhdnsrpstatus').text());
    
    obj['channel'] = $('#cbopopchannel').val();
    obj['amount'] = $('#numpopamount').val();
    obj['bank'] = $('#cbopopbank').val();
    obj['paydatetime'] = $('#dtppopdate').val();
    obj['accountno'] = $('#numpopaccountno').val();
    
    if(obj['id']==='btnpopsdmamapost' && obj['srpstat']==='Fail'){
        if(!confirm('The student academic status is fail. Continue anyway?')){
            return;
        }
    }else{
        if(obj['id']==='btnpopsdverifonly'){
            if(!confirm("Status update only. No posting of payment. Continue?")){return;}
        }else{
            if(!confirm("Continue?")){return;}
        }            
    }
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});
$(document).on('click', "[id^='rtpopslnedta_']", function(){    
    obj = {};
    obj['id'] = 'F938NWIEF';        
    obj['recid'] = $(this).data('recid');
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);                
});
$(document).on('change', '#cbopopsnstat, #cbopopsbank, #txtpopidnofilter', function(){
    obj = {};
    obj['id'] = 'cbopopsnstat';        
    obj['status'] = $('#cbopopsnstat').val();
    obj['bank'] = $('#cbopopsbank').val();
    obj['idno'] = $('#txtpopidnofilter').val();
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'divadmpopslst', null);                
});
$(document).on('click', "#finbpproff, #finbpprtamshopoff, [id^='fin__']", function(){
    obj = {};
    obj['id'] = $(this).attr('id');        
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);            
});
$(document).on('click', '#finbpmpose', function(){
    obj = {};
    obj['id'] = $(this).attr('id');        
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);            
});
$(document).on('click', '#finlhbkpttsd', function(){
    obj = {};
    obj['id'] = $(this).attr('id');        
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);            
});
$(document).on('change', '#cbofinholdyear, #cbofinholdmonth, #cbofinholdstatus', function(){
    obj = {};
    obj['id'] = "dlsnifflhptys";
    obj['year'] = $('#cbofinholdyear').val();
    obj['month'] = $('#cbofinholdmonth').val();
    obj['status'] = $('#cbofinholdstatus').val();
    obj['hash'] = $('#hash').val();
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'nifilhdlpymts', null);
});
$(document).on('click', "[id^='xhdlptsmfi_']", function(){
    if(!confirm('Continue?')){return;}
    obj = {};
    obj['id'] = "hdlptsmfi_";
    obj['idd'] = $(this).attr('data-id');
    obj['idno'] = $(this).attr('data-idno');
    obj['amount'] = $(this).attr('data-amount');
    obj['datetime'] = $(this).attr('data-dateime');
    obj['bank'] = $(this).attr('data-bank');    
    obj['hash'] = $(this).attr('data-hash');    
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});
$(document).on('click', '#finlhbkpffregsh', function(){
    $('#cbofinholdyear').trigger('change');
});
$(document).on('click', "[id^='finlhbkpfrdfrld_']", function(){
    obj = {};
    obj['id'] = "dlsnifflhptys";
    obj['year'] = $('#cbofinholdyear').val();
    obj['month'] = $('#cbofinholdmonth').val();
    obj['status'] = $('#cbofinholdstatus').val();
    obj['hash'] = $('#hash').val();
    obj['iidd'] = $(this).attr('id');
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'nifilhdlpymts', null);    
});
$(document).on('click', "[id^='hdlptsmnl_'], [id^='hdlptsmpostednl_'], [id^='hdlptsivlidd_'], [id^='hdlptsmfi_']", function(){
    if(!confirm('Continue?')){return;}
     
    obj = {};
    obj['id'] = "hdlptsmfnopi_";
    obj['idd'] = $(this).attr('data-id');
    obj['idno'] = $(this).attr('data-idno');
    obj['amount'] = $(this).attr('data-amount');
    obj['datetime'] = $(this).attr('data-dateime');
    obj['bank'] = $(this).attr('data-bank');    
    obj['hash'] = $(this).attr('data-hash');
    obj['act'] = $(this).attr('data-act');
    
    remarks = $('#hdlptremarks_'+obj['idd']).val();
    
    obj['remarks'] = remarks;
    
    if(remarks.trim().length===0){
        alert('Remarks is required');
        return;
    }
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});
$(document).on('click', '#dtsadmpdronsexspte', function(){
    if(!confirm('Continue?')){return;}
    
    appno = getEncodedDOMval($(this).attr('data-appno'));
    trackingcode = getEncodedDOMval($(this).attr('data-trackingcode'));
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    obj['dml'] = 'dtsbdkettoprocs';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                                
});
$(document).on('click', '#admscdteset', function(){
    if(!confirm('Continue?')){return;}
    
    appno = getEncodedDOMval($('#txtappno').val());
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    obj['dml'] = 'admscdteset';        
    obj['hsid'] = hsid;
    obj['lval'] = $('#dtptacndte').val();
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                                
});

$(document).on('click', '#admdsedkset', function(){
    if(!confirm('Continue?')){return;}
    
    appno = getEncodedDOMval($('#txtappno').val());
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    obj['dml'] = 'admdsedkset';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                                
});

$(document).on('click', '#dtsadmacctclr', function(){
    openForm('DTS - FOR ACCOUNTING CLEARANCE', '80%', dtsfactclr());
});

function dtsfactclr(){
    obj = {};
    obj['id'] = 'dtsactclrnces';
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'formContent', null);      
}
function rldactndocs(){
    obj = {};
    obj['id'] = 'dtsactclrnrlddocsces';
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'dvactclrdocsulded', function(){
        $('#dtsactnfle').val('');
    });          
}

$(document).on('click', '#btnactclruldf', function(){    
    launchFUldr('dtsactnfle', '', '11', 'rldactndocs()', '');
    // inputfileid, refid, subdir, callback, brwosefilter, refid2
});

$(document).on('click', "[id^='rmduldactulda_']", function(){
    if(!confirm('Continue?')){return;}
    
    appno = getEncodedDOMval($('#txtappno').val());
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    obj['dml'] = 'rmduldactulda';        
    obj['hsid'] = hsid;
    
    obj['hsid2'] = $(this).data('sh');
    obj['id2'] = $(this).data('id');  
    obj['fname'] = $(this).data('fname');  
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                                    
});

$(document).on('change', "[id^='deiuldacdtf_']", function(){
    appno = getEncodedDOMval($('#txtappno').val());
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    obj['dml'] = 'deiuldacdtf';        
    obj['hsid'] = hsid;
    
    obj['hsid2'] = $(this).data('sh');
    obj['id2'] = $(this).data('id');  
    obj['fname'] = $(this).data('fname');  
    obj['dname'] = $(this).val();  
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                                    
});

$(document).on('click', "#btnogoaccnw", function(){
    if(!confirm('Continue?')){return;}
    
    appno = getEncodedDOMval($('#txtappno').val());
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    obj['dml'] = 'btnogoaccnw';        
    obj['hsid'] = hsid;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                                    
});

$(document).on('click', '#btnactclear', function(){
    if(!confirm('Continue?')){return;}
    
    appno = getEncodedDOMval($('#txtappno').val());
    trackingcode = getEncodedDOMval($('#txttrackingcode').val());
    hsid = getEncodedDOMval($('#txthdid').val());
    
    obj = {};
    obj['id'] = 'dtsdmlapdoc';        
    obj['trackingcode'] = trackingcode;
    obj['appno'] = appno;
    obj['dml'] = 'btnactclear';        
    obj['hsid'] = hsid;
    obj['idno'] = getEncodedDOMval($('#tsdidno').val());
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                                        
});
function ldschapplgntmon(){
    obj  	= {'id':'ldschapplgntmon'};								
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);
}
function ldschgntdtamon(soid){
    schyr = $('#cboschyrschgrntmon').val();
    sem = $('#cbosemschgrntmon').val();
    idno = $('#txtidnoschgrntmon').val();
    
    obj = {};
    obj['id'] = 'DFIM094G';            
    obj['schyr'] = schyr;
    obj['sem'] = sem;
    obj['soid'] = soid;
    obj['idno'] = idno;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'dvscmondcont', null);
}

$(document).on('click', "[id^='scmokdlrem_']", function(){
    if(!confirm('Continue?')){return;}
    
    obj = {};
    obj['id'] = 'RIFN983';            
    obj['soid'] = $(this).data('soid');
    obj['hs'] = $(this).data('hs');
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});

$(document).on('change', '#cbomantposta', function(){
    obj = {};
    obj['id'] = "SDF93MFO";
    obj['val'] = $("#cbomantposta").val();
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'divmtumainidx', null);
});
$(document).on('click', '#btnmtureqref', function(){
    $("#cbomantposta").trigger('change');
});

$(document).on('click', '#btmmtureqsve', function(){
    if(!confirm('Continue?')){return;}
    obj = {};
    obj['id'] = "DFN983RSD";
    
    $('#divmtureqctrls :input').each(function (){
        id = $(this).attr('id');
        val = $(this).val();
        obj[id] = getEncodedDOMval(val);
    });
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});

$(document).on('click', "[id^='mtulstremev_']", function(){
    if(!confirm('Continue?')){return;}
    obj = {};
    obj['id'] = "93FSLKDF";
    obj['recid'] = $(this).data('recid');
    obj['idno'] = $(this).data('idno');
    obj['hash'] = $(this).data('hash');
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);        
});

$(document).on('change', '#cbomtusttcho', function(){
    obj = {};
    obj['id'] = "OMSC9834";
    obj['val'] = 'approval';
    obj['v'] = $(this).val();
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'divmtumainidx', null);        
});

$(document).on('change', "[id^='ididcermtuptos_']", function(){
    unchecked = 0;
    $("[id^='ididcermtuptos_']:not(:checked)").each(function(){
        unchecked++;
    });
    
    $("#ididcermcall").prop('checked', unchecked===0?true:false);
});

$(document).on('click', "#btnmtusubmit", function(){
    if(!confirm('Continue?')){return;}
    
    obj = {};
    recs = {};
    indv = {};    
    obj['id'] = "X093FRF";
    
    lx=0;
    $("[id^='ididcermtuptos_']:checked").each(function(){
        indv['idno'] = $(this).data('idno');
        indv['recid'] = $(this).data('recid');
        indv['hash'] = $(this).data('hash');
        
        recs[lx++] = JSON.stringify(indv);
    });
    obj['recs'] = JSON.stringify(recs);    
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);        
});

$(document).on('click', '#btnmtudecline', function(){
    if(!confirm('Continue?')){return;}

    recs = {};
    indv = {};    
    obj = {};
    obj['id'] = "FM9W83MJF";
    
    lx=0;
    $("[id^='ididcermtuptos_']:checked").each(function(){
        indv['idno'] = $(this).data('idno');
        indv['recid'] = $(this).data('recid');
        indv['hash'] = $(this).data('hash');
        
        recs[lx++] = JSON.stringify(indv);
    });
    obj['recs'] = JSON.stringify(recs);        
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);            
});

$(document).on('change', '#cbopopchannel', function(){
    // shared function
    pchannel = $(this).val();        
    litms = 0;
    llastitmval = '';
    bankchannels = '';
    
    $("#cbopopbank > option").each(function(){        
        bankchannels = $(this).data('pchannel');
        acntchanel = $(this).data('acntchanel');
        
        if(acntchanel===undefined){acntchanel='x';}
        
        if(bankchannels==='-'){
            $(this).prop('selected', 'selected');
        }else if(bankchannels.includes(pchannel) && (acntchanel.includes(pchannel) || acntchanel==='x')){
            $(this).removeClass('w3-hide');
            llastitmval = $(this).val();
            litms++;
        }else{
            $(this).addClass('w3-hide');
        }
    });
    
//    if(litms===1){
//        $('#cbopopbank').val(llastitmval);
//        $('#dvpopbanksel').addClass('w3-hide');
//        
//        acntno = $("#cbopopbank option:selected").data('accountno');
//        $('#numpopaccountno').val(acntno);
//    }else{
//        $('#dvpopbanksel').removeClass('w3-hide');
//        $('#numpopaccountno').val('null');
//        $('#cbopopbank').val('null');
//    }
    
    $('#dvpopbanksel').removeClass('w3-hide');
    $('#numpopaccountno').val('null');
    $('#cbopopbank').val('null');    
    
    $('#cbopopbank').trigger('change');
});

$(document).on('change', '#cbopopbank', function(){
    acntcode = '';
    channel = $('#cbopopchannel').val();
    if($("#cbopopbank option:selected").data('accntcode')!==undefined){
        acntcode = $("#cbopopbank option:selected").data('accntcode');        
    }
    
    litms = 0;
    llastitmval = '';
    
    bankcode_ = $(this).val();
    
    $("#numpopaccountno > option").each(function(){        
        bankcode = $(this).data('bankcode');
        accchannel = $(this).data('channel');
        if(accchannel===undefined){accchannel='';}
        if(bankcode==='-'){
            $(this).prop('selected', 'selected');
        }else if(bankcode === bankcode_ && accchannel.includes(channel)){            
            $(this).removeClass('w3-hide');
            llastitmval = $(this).val();
            litms++;
        }else{
            $(this).addClass('w3-hide');
        }
    });    
    
    if(litms===1){
        $('#numpopaccountno').val(llastitmval);
    }else{
        if(acntcode.length===0){
            $('#numpopaccountno').val('null');
        }else{
            $('#numpopaccountno').val(acntcode);
        }        
    }    
});

$(document).on('change', '#ididcermcall', function(){
    chcked = $(this).is(':checked');
    
    $("[id^='ididcermtuptos_']").each(function (){
        $(this).prop('checked', chcked);        
    });
});

$(document).on('change', "#divpopidnmdputs :input", function(){
    $('#btnpopsdmamsave').removeClass('w3-hide');
    $("[id^='rtpopslnedta_']").removeClass('w3-hide');
    
    $('#btnpopsdmamapost').addClass('w3-hide');
    $('#btnpopsdmampost').addClass('w3-hide');
    $('#btnpopsdmadecline').addClass('w3-hide');
    $('#btnpopsdverifonly').addClass('w3-hide');
});

$(document).on('click', '#finmanpaege', function(){
    finmpge();
});

function finmpge(){
    obj = {};
    obj['id'] = "83MOIKDFS";
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);      
}

function frmbrpt(rptid, rptno, hash){    
    obj = {};
    obj['id'] = "09MCOSIEJR";
    obj['id2'] = rptid;
    obj['id3'] = rptno;
    obj['hash'] = hash;
    
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);          
}

$(document).on('click', '#btndmapidvie', function(){
    if(!checkRequiredFieldsDIV('rptctrls')){return;}
    
    obj = {};
    obj['id'] = "SD890FMJ2";
    
    $("#rptctrls").find(":input").each(function(){
        id = $(this).attr('id');
        val = getEncodedDOMval($(this).val());
        obj[id] = val;
    });
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'rptcontent', null);      
});

$(document).on('click', '#mdpopppurs', function(){
    obj = {};
    obj['id'] = "SOIMFRSD";
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);              
});

$(document).on('change', '#tpdpoptnew', function(){
    if($(this).val().trim().length===0){
        return;
    }
    obj = {};
    obj['id'] = $(this).attr('id');        
    obj['recid'] = $(this).data('recid');
    obj['hash'] = $(this).data('hash');
    obj['idno'] = $(this).data('idno');
    obj['newpurp'] = getEncodedDOMval($(this).val());

    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});

$(document).on('click', "[id^='dpopdemrem_']", function(){    
    if(!confirm('Continue?')){return;}
    
    obj = {};
    obj['id'] = 'dpopdemrem';        
    obj['recid'] = $(this).data('recid');
    obj['hash'] = $(this).data('hash');
    obj['idno'] = $(this).data('idno');

    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});
$(document).on('click', "[id^='dpopdemupd_']", function(){    
    obj = {};
    obj['id'] = 'dpopdemupd';        
    obj['recid'] = $(this).data('recid');
    obj['hash'] = $(this).data('hash');
    obj['idno'] = $(this).data('idno');
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});
$(document).on('change', "[id^='dpopdemren_']", function(){    
    obj = {};
    obj['id'] = 'dpopdemren';        
    obj['recid'] = $(this).data('recid');
    obj['hash'] = $(this).data('hash');
    obj['idno'] = $(this).data('idno');
    obj['newpurp'] = getEncodedDOMval($(this).val());
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});
$(document).on('click', "#mdpopapdtkdli", function(){
    
    obj = {};
    obj['id'] = $(this).attr('id');        
    obj['recid'] = $(this).data('recid');
    obj['hash'] = $(this).data('hash');
    obj['idno'] = $(this).data('idno');
    obj['newpurp'] = getEncodedDOMval($(this).data('remarks'));

    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});

$(document).on('click', '#numpopxuln', function(){
    if(!confirm('Continue?')){return;}
    
    val = $('#numpopxulns').val();
    
    if(isNaN(val)){
        alert('Value must be a valid numeric');
        return;
    }
    
    obj = {};
    obj['id'] = $(this).attr('id');        
    obj['recid'] = $(this).data('recid');
    obj['hash'] = $(this).data('hash');
    obj['idno'] = $(this).data('idno');
    obj['mmax'] = getEncodedDOMval(val);

    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});

$(document).on('change', "[id^='admpopchannel_'], [id^='admpopamount']", function(){
    $("[id^='btndtspopaprvve']").addClass('w3-hide');
    $('#btnadmpopsvech').removeClass('w3-hide');
});
function lpopdmseditko(){
    $("[id^='btndtspopaprvve']").removeClass('w3-hide');
    $('#btnadmpopsvech').addClass('w3-hide');
    
}

$(document).on('click', '#btnadmpopsvech', function(){
    if(!confirm('Continue?')){return;}
    
    obj = {};
    allps = {};
    obj['id'] = '90MF0S9EF';
    obj['dml'] = 'MP994534DF';
    obj['hsid'] = $(this).data('hsid');
    obj['appno'] = $('#txtappno').val();
    obj['trackingcode'] = $('#txttrackingcode').val();
    
    $("[id^='admpopchannel_']").each(function(){
        indp = {};
        indp['recid'] = $(this).data('recid');
        indp['channel'] = $(this).val();
        indp['amount'] = $('#admpopamount_'+indp['recid']).val();
        
        allps[indp['recid']] = JSON.stringify(indp);
    });
    
    obj['allps'] = allps;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);    
});

$(document).on('click', '#apforgradpaprovl', function(){
    obj = {};
    obj['id'] = "9MFPAODFKE";
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);     
});

$(document).on('click', "[id^='gpaapprl_']", function(){    
    idno = $(this).data('idno');
    hash = $(this).data('hash');
    schyr = $(this).data('schyr');
    sem = $(this).data('sem');
    
    obj = {};
    obj['id'] = "209MFSOPDFK";
    obj['idno'] = idno;
    obj['hash'] = hash;
    obj['schyr'] = schyr;
    obj['sem'] = sem;
    
    dbParam = JSON.stringify(obj);
    
    openFormparam(gpaaaprol, dbParam);
});
function gpaaaprol(dbParam){
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'formContent', null);     
}
$(document).on('change', "[name^='gpastsadmaprvl_']", function(){
    did = $(this).data('did');
    hash = $(this).data('hash');
    val = $(this).val();
    
    obj = {};
    obj['id'] = "093MSODKoiJ3)(";
    obj['did'] = did;
    obj['hash'] = hash;
    obj['val'] = val;
    
    dbParam = JSON.stringify(obj);    
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);     
});
$(document).on('click', '#idftinkiteg', function(){
    obj = {};
    obj['id'] = "93MOOiMODI9";
    
    dbParam = JSON.stringify(obj);    
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);         
});
$(document).on('click', '#admaffcaer', function(){
    obj = {};
    obj['id'] = "09mfngiaIUHSN87";
    
    dbParam = JSON.stringify(obj);    
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);             
});

$(document).on('click', "[id^='admrereq_'], [id^='admagrgr_'], [id^='admschop_']", function(){
    obj = {};
    obj['id'] = "9W8EFJSFJOIW";
    obj['id2'] = $(this).data('cat');
    obj['id3'] = $(this).data('id');
    
    dbParam = JSON.stringify(obj);    
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                 
});

$(document).on('click', "#idvbgpusetpu", function(){
    obj = {};
    obj['id'] = "2MRWDFOWIJR";
    
    dbParam = JSON.stringify(obj);    
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);
});

$(document).on('keypress', '#txtap4gradp2aprval', function(e){
    if(e.which===13){
        obj = {};        
        obj['id'] = "9MFPAODFKE";
        obj['idno'] = $(this).val();

        dbParam = JSON.stringify(obj);
        callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);             
    }
});

$(document).on('click', '#lmdndbarring', function(){
    obj = {};        
    obj['id'] = "0MFSUHN8RG3EW";

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);                 
});

$(document).on('click', '#facbarrefresh', function(){
    obj = {};        
    obj['id'] = "SDFJ938TOAKD";

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'dividbardta', null);                     
});

$(document).on('click', '#rabdtaedi, #rabbdtanew', function(){
    obj = {};        
    obj['id'] = $(this).attr('id');
    obj['rid'] = $(this).data('rid');

    dbParam = JSON.stringify(obj);
    
    openFormparam(rabeidt, dbParam);    
});
function rabeidt(dbParam){
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'formContent', null);
}

$(document).on('click', '#btnbarradmsav', function(){
    if(!confirm('Continue?')){return;}
    obj = {};        
    obj['id'] = "S93MOK092AD";
    remarks = getEncodedDOMval($('#barr_remarks').val());
    obj['startdate'] = getEncodedDOMval($('#barr_startdate').val());
    obj['enddate'] = getEncodedDOMval($('#barr_enddate').val());
    obj['status'] = getEncodedDOMval($('#barr_status').val());

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam+"&remarks="+remarks, "jq/feuapps/gway.php", '', null);                         
});

$(document).on('click', '#rabdtarem', function(){
    if(!confirm('Continue?')){return;}
    obj = {};        
    obj['id'] = "4MRODFHIWU3H";
    obj['rid'] = $(this).data('rid');

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                         
});

function dmlbarringok(msg){
    alert(msg); 
    $('#btnbarradmcancel').trigger('click'); 
    $('#facbarrefresh').trigger('click');
}

$(document).on('click', '#btnaffaschapptyepes', function(){
    obj = {};        
    obj['sort'] = '';
    obj['id'] = "COAWIR834A";

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);       
});

$(document).on('click', "[data-apptypecolh]", function(){
    obj = {};        
    obj['sort'] = $(this).data('apptypecolh');
    obj['id'] = "COAWIR834A";

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);           
});

$(document).on('click', '#btnadmnapptype', function(){
    obj = {};        
    obj['id'] = "S09DJG5MGJO";

    dbParam = JSON.stringify(obj);
    
    openFormparam(schoappnewed, dbParam);
});

$(document).on('click', '[data-schtypeadmedit]', function(){
    obj = {};        
    obj['schtype'] = $(this).data('schtypeadmedit');
    obj['id'] = "S09DJG5MGJO";

    dbParam = JSON.stringify(obj);
    
    openFormparam(schoappnewed, dbParam);    
});

function schoappnewed(dbParam){
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'formContent', null);     
}

$(document).on('click', '#admschnedml', function(){
    if(!confirm('Continue?')){return;}
    
    obj = {};                
    obj['id'] = "SODIFJQ34MF";
    obj['schtype'] = $('#admnesch_type').val();
    obj['schname'] = getEncodedDOMval($('#admnesch_name').val());
    obj['group'] = getEncodedDOMval($('#admnesch_group').val());
    obj['gradugrad'] = getEncodedDOMval($('#admnesch_gradugrad').val());
    obj['base'] = getEncodedDOMval($('#admnesch_base').val());
    obj['email'] = getEncodedDOMval($('#admnesch_email').val());
    req = getEncodedDOMval($('#admnesch_req').val());

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam+'&req='+req, "jq/feuapps/gway.php", '', null);           
});

$(document).on('click', '[data-schtypeadmreqs]', function(){
    obj = {};        
    
    obj['schtype'] = $(this).data('schtypeadmreqs');
    obj['grpp'] = $(this).data('grpp');
    obj['id'] = "9344FFAK";
    
    dbParam = JSON.stringify(obj);
    
    openFormparam(function(){
        callServerPOST(dbParam, "jq/feuapps/gway.php", 'formContent', null);           
    }, dbParam);      
});

$(document).on('click', "[data-schtypereqq]", function(){
    obj = {};        
    obj['schtype'] = $(this).data('schtypeadmreqsen');
    obj['reqid'] = $(this).data('schtypereqq');
    obj['grpp'] = $(this).data('grpp');
    obj['id'] = "SD9F8MJ34IMF";

    dbParam = JSON.stringify(obj);    
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);           
});

function refrshschreqs(schtype, pgrpp){
    obj = {};        
    obj['schtype'] = schtype;
    obj['grpp'] = pgrpp;
    obj['id'] = "9344FFAK";

    dbParam = JSON.stringify(obj);
    
    openFormparam(function(){
        callServerPOST(dbParam, "jq/feuapps/gway.php", 'formContent', null);           
    }, dbParam);               
}

function loaddtsdocumentStatus(){
    obj = {};        
    obj['id'] = "AE084MJFIEJF";

    dbParam = JSON.stringify(obj);
    
    openFormparam(function(){
        callServerPOST(dbParam, "jq/feuapps/gway.php", 'dtsdocumentstatusstats', null);           
    }, dbParam);                   
}

$(document).on('click', '#dtsdocstathdr', function(){
    loaddtsdocumentStatus();
});

$__institute = '';
$__statusname = '';
$(document).on('click', "[id^='dtsdocstatcount_']", function(){
    $__institute = $(this).data('institute');
    $__statusname = $(this).data('statusname');    
    dtsloadtrackm2();
});

function dtsloadtrackm2(){
    obj = {};
    obj['id'] = 'dtsmntckee';

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', function(){        
        obj = {};
        obj['id'] = 'dtsmnltramserch';
        obj['dtsmnltratxtinstitute'] = $__institute;
        obj['dtsmnltratxtstatusname'] = $__statusname;

        dbParam = JSON.stringify(obj);
        callServerPOST(dbParam, "jq/feuapps/gway.php", 'vddtstakrcsres', null);          
    });          
}
 
//<editor-fold defaultstate="collapsed" desc="Property">
var acosllmmt_prop = 0;
var acosllmmtaut_prop = false;
$(document).on('click', '#btnpropdlnsdta', function(){
    obj = {};
    obj['id'] = $(this).attr('id');        
    
    acosllmmtaut_prop=false;
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', function(){proprn();});        
});
function proprn(){
    obj = {};
    obj['id'] = 'btnpropdlnsdtaproc';        
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'acosdltasts', null);            
}
$(document).on('click', '#btnrexcnsdownl', function(){
    if(!confirm('Continue?')){return;}
    
    obj = {};
    obj['id'] = 'propdlnwre';        
    
    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", '', null);                
});
$(document).on('click', '#iiccossffrd_prop', function(){    
    acttmmrcooldds_prop();
});
function acttmmrcooldds_prop(){
    if(acosllmmt_prop===0){
        lint = $('#acosrffintlav').val();
        proprn();
        acosllmmtaut_prop = true;        
        acosllmmt_prop = setInterval(function(){
                               if($('#iiccossffrd_prop').length===0 || !acosllmmtaut_prop){
                                   clearInterval(acosllmmt_prop);
                                   acosllmmt_prop = 0;
                               }else{
                                   proprn();
                               }
                    }, lint);
    }
}
//</editor-fold>


//<editor-fold defaultstate="collapsed" desc="BRYAN SD">
function loadoffenses(){
    obj['id'] = 'SDgat30ff3ns3s';
    obj['schyr'] = $('#schyr option:selected').val();
    obj['sem'] = $('#sem option:selected').val(); 
    obj['studno'] = $('#studno').val();
    
    dbParam = JSON.stringify(obj);		
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);     
}

$(document).on('click', '#lmdndoffenses', function(){
    obj = {};        
    obj['id'] = "SDgat30ff3ns3s";
    obj['schyr'] = "ALL";
    obj['sem'] = "ALL";
    obj['studno'] = "";

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam, "jq/feuapps/gway.php", 'mypagecontent', null);                 
});

$(document).on('click', "[id^='raddbarring']", function(){

    obj = {};        
    obj['id'] = 'sdsearchoffense';
    obj['idno'] = $(this).attr('id').replace("raddbarring_", "");
    obj['classtart'] = getEncodedDOMval($('#txtclassstart').val());
    obj['classend'] = getEncodedDOMval($('#txtclassend').val());
    
    dbParam = JSON.stringify(obj);
    
    openFormparam(rabeidt, dbParam);    
});

$(document).on('click', '#btnaddbarringsave', function(){
    if(!confirm('Continue?')){return;}
    obj = {};        
    obj['id'] = "sdbarringoffensesave";
    remarks = getEncodedDOMval($('#barring_remarks').val());
    obj['startdate'] = getEncodedDOMval($('#barring_startdate').val());
    obj['enddate'] = getEncodedDOMval($('#barring_enddate').val());
    obj['status'] = getEncodedDOMval($('#barring_status').val());

    dbParam = JSON.stringify(obj);
    callServerPOST(dbParam+"&remarks="+remarks, "jq/feuapps/gway.php", '', null); 
    
});

function dmlgateoffenseok(msg){
    $('#btnaddbarringcancel').trigger('click'); 
    loadoffenses();
}
//</editor-fold>