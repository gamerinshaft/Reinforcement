'use strict';

// アプリケーションをコントロールするモジュール
var app = require('app');
// ウィンドウを作成するモジュール
var BrowserWindow = require('browser-window');

// メインウィンドウはGCされないようにグローバル宣言
var mainWindow = null;

// 全てのウィンドウが閉じたら終了
app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// Electronの初期化完了後に実行
app.on('ready', function() {
  // メイン画面の表示。ウィンドウの幅、高さを指定できる
  mainWindow = new BrowserWindow({width: 800, height: 600});
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // ウィンドウが閉じられたらアプリも終了
  mainWindow.on('closed', function() {
    mainWindow = null;
  });
});


var ActiveRecord = require('active_record');

ActiveRecord.Base.configure_connection({
  driver: 'mysql',
  hostname: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'active_record'
  pool: true,
  'pool config': { min: 1, max: 20 }
});

module.exports = User
/* Extends the module to ActiveRecord.Base */
ActiveRecord.Base.extend(User, ActiveRecord.Base)
/* Create the Class */
function User (){
  /* Initialize the instance variables */
  this.initialize(arguments[0]);
  /** Validations */
  this.validates('name', {
    presence: true,
    length: { minimum: 6, maximum: 25 }
  })
  this.validate_length_of('password', {minimum: 5});
  this.has_secure_password(); /* Call this function after another validations */
}

/* Configure the model */
User.table_name = 'users';
User.fields('name', 'password'); // Create dynamics finders: User.find_by_name, etc.
/* Configure the Associations */
User.has_many('phones');
