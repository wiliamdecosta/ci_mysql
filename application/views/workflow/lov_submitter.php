<div id="modal_lov_submitter" class="modal fade" tabindex="-1" style="overflow-y: scroll;">
    <div class="modal-dialog" style="width:800px;">
        <div class="modal-content">
            <!-- modal title -->
            <div class="modal-header no-padding">
                <div class="table-header">
                    <span class="form-add-edit-title"> KONFIRMASI PENUTUPAN PEKERJAAN </span>
                </div>
            </div>

            <!-- modal body -->
            <div class="modal-body" style="overflow-y:scroll;height:420px;">
                <form class="form-horizontal" application="form" id="form_submitter">
                    <input type="hidden" id="form_submitter_params">
                    <input type="hidden" id="p_w_doc_type_id">
                    
                    <div class="form-group">
                        <label class="col-md-3 control-label no-padding-right"> Tanggal :</label>
                        <div class="col-sm-3">
                            <label class="control-label blue bold" id="submitter_date"> <?php echo date('d-m-Y');?> </label>
                        </div>

                        <label class="col-md-3 control-label no-padding-right"> Submit Oleh :</label>
                        <div class="col-sm-3">
                            <label class="control-label blue bold" id="form_submitter_by"> <?php echo $this->session->userdata('user_name'); ?> </label>
                        </div>
                        
                    </div>
                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right bold"> Pekerjaan Selanjutnya :</label>
                        <div class="col-sm-3">
                            <label class="control-label blue bold" id="form_submitter_next_job"> </label>
                        </div>
                        
                        <label class="col-sm-3 control-label no-padding-right"> Pekerjaan Sebelumnya :</label>
                        <div class="col-sm-3">
                            <label class="control-label blue" id="form_submitter_prev_job"> </label>
                        </div>
                        
                    </div>

                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right"> Status Dokumen : </label>
                        <div class="col-sm-9">
                            <label class="control-label blue" id="form_submitter_status_order"></label>
                        </div>
                    </div>


                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right"> Pesan Dikirim : </label>
                        <div class="col-sm-9">
                            <textarea id="form_submitter_interactive_message" class="form-control" rows="1" cols="52" placeholder="Ketikkan pesan Anda kepada penerima pekerjaan..."></textarea>
                        </div>
                    </div>

                    <hr/>

                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right font-green"> Pesan Berhasil Dikirim :</label>
                        <div class="col-sm-9">
                            <textarea id="form_submitter_success_message" class="form-control font-green" readonly="readonly" rows="1" cols="52" placeholder="Generated By System"></textarea>
                        </div>
                    </div>

                    <div class="form-group">
                        <label class="col-sm-3 control-label no-padding-right font-red"> Pesan Error/Warning :</label>
                        <div class="col-sm-9">
                            <textarea id="form_submitter_error_message" class="form-control font-red" readonly="readonly" rows="1" cols="52" placeholder="Generated By System"></textarea>
                        </div>
                    </div>

                </form>
            </div>

            <!-- modal footer -->
            <div class="modal-footer no-margin-top">
                <div class="bootstrap-dialog-footer">
                    <div class="bootstrap-dialog-footer-buttons col-xs-6">
                        <button class="btn btn-danger" title="Menolak pekerjaan akan masuk ke kotak 'Reject' dan pekerjaan akan berhenti di proses ini" id="btn-submitter-reject" data-dismiss="modal">
                            <i class="fa fa-ban"></i>
                            Reject
                        </button>
                        <button class="btn btn-warning" title="Mengembalikan pekerjaan ke pekerjaan sebelumnya" id="btn-submitter-back" data-dismiss="modal">
                            <i class="glyphicon glyphicon-circle-arrow-left"></i>
                            Send Back Job
                        </button>
                    </div>
                    <div class="bootstrap-dialog-footer-buttons col-xs-1">
                        <button class="btn btn-primary radius-15" title="Submit ke pekerjaan selanjutnya dan akan masuk ke kotak Outbox" id="btn-submitter-submit" data-dismiss="modal">
                            <i class="glyphicon glyphicon-circle-arrow-right"></i>
                            Submit
                        </button>
                    </div>
                    <div class="bootstrap-dialog-footer-buttons col-xs-5">
                        <button class="btn btn-info radius-4" id="btn-submitter-close" data-dismiss="modal">
                            <i class="fa fa-times"></i>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.end modal -->

<script>
var global_prev_job = '';
var global_next_job = '';

$('#btn-submitter-submit').on('click', function(e) {
    result = confirm('Apakah Anda yakin menutup pekerjaan ini ?');

    if (result) {
        var submitter_params = $('#form_submitter_params').val();
        var message = $('#form_submitter_interactive_message').val();

        $.ajax({
            type: 'POST',
            datatype: "json",
            url: '<?php echo WS_JQGRID."workflow.wf_controller/submitter_submit"; ?>',
            data: {params : submitter_params , interactive_message : message},
            timeout: 10000,
            success: function(data) {
                var response = JSON.parse(data);
                if(response.success) {
                    if( response.message.trim() == 'sukses') {
                        $('#form_submitter_success_message').val( response.message );
                        modal_lov_submitter_back_summary();
                    }else {
                        $('#form_submitter_error_message').val( response.message );
                        modal_lov_submitter_hide_all_buttons(true);
                    }
                }else {
                    swal("Error", response.message, "warning");
                }
            }
        });
    }
    return false;
});

$('#btn-submitter-reject').on('click', function(e) {
    if( $('#form_submitter_interactive_message').val() == "" ) {
        swal("", "Ketikkan pesan Anda sebagai alasan penolakan pekerjaan", "info");
        return false;
    }

    result = confirm('Pekerjaan ini akan ditolak dan masuk pada box "Reject" serta tidak dapat dipulihkan. Apakah Anda yakin menolak pekerjaan ini ?');
    if (result) {
        var submitter_params = $('#form_submitter_params').val();
        var message = $('#form_submitter_interactive_message').val();

        $.ajax({
            type: 'POST',
            datatype: "json",
            url: '<?php echo WS_JQGRID."workflow.wf_controller/submitter_reject"; ?>',
            data: {params : submitter_params , interactive_message : message},
            timeout: 10000,
            success: function(data) {
                var response = JSON.parse(data);
                if(response.success) {
                    if( response.message.trim() == 'sukses') {
                        $('#form_submitter_success_message').val( response.message );
                        modal_lov_submitter_back_summary();
                    }else {
                        $('#form_submitter_error_message').val( response.message );
                        modal_lov_submitter_hide_all_buttons(true);
                    }
                }else {
                    swal("Error", response.message, "warning");
                }
            }
        });
    }

    return false;
});

$('#btn-submitter-back').on('click', function(e) {
    if( $('#form_submitter_interactive_message').val() == "" ) {
        swal("", "Ketikkan pesan Anda sebagai alasan mengembalikan pekerjaan", "info");
        return false;
    }

    result = confirm('Apakah Anda yakin mengembalikan pekerjaan ini ke tahap '+ global_prev_job +'?');
    if (result) {
        var submitter_params = $('#form_submitter_params').val();
        var message = $('#form_submitter_interactive_message').val();

        $.ajax({
            type: 'POST',
            datatype: "json",
            url: '<?php echo WS_JQGRID."workflow.wf_controller/submitter_send_back"; ?>',
            data: {params : submitter_params , interactive_message : message},
            timeout: 10000,
            success: function(data) {
                var response = JSON.parse(data);
                if(response.success) {
                    if( response.message.trim() == 'sukses') {
                        $('#form_submitter_success_message').val( response.message );
                        modal_lov_submitter_back_summary();
                    }else {
                        $('#form_submitter_error_message').val( response.message );
                        modal_lov_submitter_hide_all_buttons(true);
                    }
                }else {
                    swal("Error", response.message, "warning");
                }
            }
        });
    }

    return false;
});

function modal_lov_submitter_show(params_submit) {
    modal_lov_submitter_init(params_submit, modal_lov_submitter_show_up);
}

function modal_lov_submitter_show_up() {
    $("#modal_lov_submitter").modal({backdrop: 'static'});
}

function modal_lov_submitter_init(params_submit, callback) {
    
    global_prev_job = params_submit.prev_job_wf_name;
    global_next_job = params_submit.next_job_wf_name;

    $('#form_submitter_status_order').html(params_submit.status_order);
    $('#form_submitter_next_job').html(params_submit.next_job_wf_name);
    $('#form_submitter_prev_job').html(params_submit.prev_job_wf_name);

    $('#p_w_doc_type_id').val(params_submit.p_w_doc_type_id);
    $('#form_submitter_params').val( JSON.stringify(params_submit) );
    
    if(params_submit.prev_job_wf_id == '') {
        $('#btn-submitter-back').hide();
    }

    callback();
}

function modal_lov_submitter_back_summary() {
    
    var in_p_w_doc_type_id = $('#p_w_doc_type_id').val();
    
    modal_lov_submitter_hide_all_buttons();

    setTimeout(function(){
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        loadContentWithParams( 'workflow.wf_summary' , {p_w_doc_type_id : in_p_w_doc_type_id} );
    },3000);
}

function modal_lov_submitter_hide_all_buttons(except_close = false) {
    $('#btn-submitter-submit').remove();
    $('#btn-submitter-reject').remove();
    $('#btn-submitter-back').remove();

    if(!except_close)
    $('#btn-submitter-close').remove();
}


</script>