var jsPsych = initJsPsych({
  on_finish: function() {
    jsPsych.data.get().localSave('csv', 'data.csv');
//    jsPsych.data.displayData();
  }
});

// var jsPsych = initJsPsych();

var preload = {
  type: jsPsychPreload,
  auto_preload: true
}

// ------------------------------------------------------------------------
// 固定の実験パーツ
// ------------------------------------------------------------------------

var enter_fullscreen = {
  type: jsPsychFullscreen,
  message: '<p>実験名: 2022-2-1 </p><p>開始ボタンを押すと全画面表示で実験が始まります。</p> <font size=1 color=silver>sound ©OtoLogic</font><br>',
  button_label: "開始",
  fullscreen_mode: true
}

// 最初の説明と被検者情報の入力
var par_id = {
  type: jsPsychSurveyText,
  questions: [
    {prompt: '<strong>これから実験始めます。</strong><br><br><br>学籍番号を入力してください', columns: 10, required: true, name: 'id'},
    {prompt: 'あなたの性別を男性であれば 1、女性であれば 2、答えたくない場合は 3 を入力してください。', columns: 10, required: true, name: 'sex'},
    {prompt: 'あなたの年齢を入力してください。', columns: 10, required: true, name: 'age'},
  ],
  button_label: '次へ',
};


var exit_fullscreen = {
  type: jsPsychFullscreen,
  fullscreen_mode: false,
  delay_after: 0
}

// 凝視点
var eyepoint = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size: 48px;">+</p>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 1500,
};

var blankscreen = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: jsPsych.NO_KEYS,
  trial_duration: 2000,
};

// 実験の終了
var bye = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: 'これで実験は終了です。 PCには触れずに実験者の指示に従ってください。',
};

var eyepointVoice = {
  type: jsPsychAudioKeyboardResponse,
  stimulus: 'voice/Countdown02-2.mp3',
  prompt: '<p style="font-size: 48px;">+</p>',
  choices: jsPsych.NO_KEYS,
  trial_duration: 4000,
};

// ------------------------------------------------------------------------
// 練習用問題の作成
// ------------------------------------------------------------------------

// 説明
var pre_hello = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '実験の練習を始めます。 1500 msec の凝視点の後に表示される指定秒数が経過したら何かキーを押してください。<br><br>何かキーを押すと始まります。',
};

var pre_bye = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '実験の練習が終わりました。 <br><br>何かキーを押すと次に進みます。',
};


var pre_examSec = [
  { label: '1.5秒' },
  { label: '7秒'},
  { label: '10秒'},
];

// 順番をランダマイズしたいので指定しておく
var pre_trials = {
  timeline: [],
  timeline_variables: pre_examSec,
  randomize_order: true,
};

// 問題の本体
var pre_exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  "<font size=48px>" + jsPsych.timelineVariable('label') + "</font>"; },
};

pre_trials.timeline.push(eyepointVoice) ;
pre_trials.timeline.push(pre_exam) ;
pre_trials.timeline.push(blankscreen) ;


// ------------------------------------------------------------------------
// 本番用問題の作成
// ------------------------------------------------------------------------

// 説明
var hello = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '実験を始めます。 1500 msec の凝視点の後に表示される指定秒数が経過したら何かキーを押してください。<br><br>何かキーを押すと始まります。',
};

var examSec = [
  { label: '0.5秒' },
  { label: '0.5秒' },
  { label: '0.5秒' },
  { label: '0.5秒' },
  { label: '0.5秒' },

  { label: '5秒' },
  { label: '5秒' },
  { label: '5秒' },
  { label: '5秒' },
  { label: '5秒' },

  { label: '1秒' },
  { label: '1秒' },
  { label: '1秒' },
  { label: '1秒' },
  { label: '1秒' },

  { label: '3秒' },
  { label: '3秒' },
  { label: '3秒' },
  { label: '3秒' },
  { label: '3秒' },

  { label: '6秒' },
  { label: '6秒' },
  { label: '6秒' },
  { label: '6秒' },
  { label: '6秒' },

  { label: '9秒'},
  { label: '9秒'},
  { label: '9秒'},
  { label: '9秒'},
  { label: '9秒'},

  { label: '12秒'},
  { label: '12秒'},
  { label: '12秒'},
  { label: '12秒'},
  { label: '12秒'},
];

// 順番をランダマイズしたいので指定しておく
var trials = {
  timeline: [],
  timeline_variables: examSec,
  randomize_order: true,
};

// 問題の本体
var exam = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {return  "<font size=48px>" + jsPsych.timelineVariable('label') + "</font>"; },
};

trials.timeline.push(eyepointVoice) ;
trials.timeline.push(exam) ;
trials.timeline.push(blankscreen) ;

// ------------------------------------------------------------------------
// 実験の開始
// ------------------------------------------------------------------------

jsPsych.run([enter_fullscreen,par_id,pre_hello,pre_trials,pre_bye,hello,trials,bye,exit_fullscreen]);
