/**
 * Command options for microphones
 */
'use strict';

var cmdsMic = {
    mic_mute: function () {
        return {command: "mic_mute"};
    },
    mic_status: function () {
        return {command: "mic_status"};
    },
    mic_unmute: function () {
        return {command: "mic_unmute"};
    },
}
