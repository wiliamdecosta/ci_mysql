<?php
    function getJobWFName($p_job_wf_id, $type='') {
        if(empty($p_job_wf_id) and $type == 'next')
            return 'Selesai';
        if(empty($p_job_wf_id) and $type == 'prev')
            return 'Tidak ada';

        $ci =& get_instance();
        $ci->load->model('workflow/p_job_wf');
        $table = $ci->p_job_wf;

        $item = $table->get($p_job_wf_id);
        return $item['job_wf_name'];
    }
?>