/**
 * Command options for communications
 */
'use strict';

var cmdsPhone = {
    answer: function() {
        return {command:"answer"};
    },
    dial: function() {
        var dialstring = this.callrate + " " + this.dialstring + " " + this.protocol;
        return {command:"dial_manual",data:{options_string:dialstring}};
    },
    disconnect: function() {
        return {command:"disconnect",data:{options:{video:this.call_id}}};
    },
    dialing_disconnect: function() {
        return {command:"dialing_disconnect"};
    },
    dial_disconnect: function() {
        return {command:"dial_disconnect"};
    },
    dtmf_send: function() {
        return {command:"dtmf_send",data:{options_string:this.key}};
    },
    start_phonebook_query: function() {
        return {command:"start_phonebook_query"};
    },
    stop_phonebook_query: function() {
        return {command:"stop_phonebook_query"};
    },
    enable_gatekeeper: function() {
        return {command:"process_command",data:{cli:"usegatekeeper specify"}};
    },
    disable_gatekeeper: function() {
        return {command:"process_command",data:{cli:"usegatekeeper off"}};
    },
    get_gatekeeper: function() {
        return {command:"process_command",data:{cli:"gatekeeperip get"}};
    },
    set_gatekeeper_discovery: function() {
        return {command:"process_command",data:{cli:"usegatekeeper specify"}};
    },
    set_gatekeeper: function() {
        var command_string = "gatekeeperip set " + this.gatekeeper;
        return {command:"process_command",data:{cli:command_string}};
    },
}
