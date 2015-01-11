phonetic_keypad
==============

html5 version of phonetic keypad made by gsyan

original version: http://gsyan888.blogspot.tw/2010/01/flash-phone.html

#架構：
本程式由數個網頁、 css 檔、 js 檔和一個資料庫組成。
網頁部分包括 index.html, phonetab.php 和輔助用的 mysql_config.php, build_db.php，它們都放在主資料夾下；css 檔包括 main.css, keyboard.css, selector.css,  controller.css，每個檔案都有兩種版本，分別放在 style/big 和 style/small 這兩個資料夾裡；js 檔則包括 CChar.js, print.js, query.js, textarea.js, inputboard.js, selector.js, keyboard.js, controller.js，都放在資料夾 js 底下；資料庫部分有一個紀錄預選字的 phonetab 表格。

##html/php 檔
 - index.html 是主要頁面，裡面定義了本程式會用到的所有元件。
 - phonetab.php 是用於查詢預選字的後台程式。
 - mysql_config.php 輔助設定 mysql 的連線與資料庫。
 - build_db.php 輔助建立資料庫。

##css 檔
 - main.css 定義 index.html 主要結構的排版。
 - keyboard.css 定義 index.html 裡 keyboard 的排版。
 - selector.css 定義 index.html 裡 selector 的排版。
 - controller.css 定義 index.html 裡 controller 的排版。

##js 檔
 - CChar.js 定義帶有注音的中文 CChar 類別與實作一些基本的函式。
 - print.js 實作將 CChar 印在 canvas 上的一些函式。
 - query.js 實作查詢預選字的函式。
 - textarea.js 實作 index.html 裡 textarea 的控制部分。
 - inputboard.js 實作 index.html 裡 inputboard 的控制部分。
 - selector.js 實作 index.html 裡 selector 的控制部分。
 - keyboard.js 實作 index.html 裡 keyboard 的控制部分。
 - controller.js 實作 index.html 裡 controller 的控制部分。

##資料庫
 - phonetab 為用於查詢預選字的表格。

#元件與排版：
index.html 定義了本程式會用到的所有元件，主要由兩個區域組成：

##主要區域
displayer (div) 為用於展示結果的區域，裡面只包含了 textarea。其中 textarea 為 canvas 物件，用於印出帶有注音的中文 CChar。

inputboard (div) 則是用於放置輸入介面的區域，包含 keyboard, selector, controller, setting等輸入介面。

其中 displayer 與 inputboard 的位置和大小都是由 main.css 設定。因為排版的關係，inputboard 被設定為固定大小的，而 displayer 則依照 inputboard 調整大小以填滿畫面。

##輸入介面
keyboard (div) 為輸入區的主要輸入介面，主要是由多個按鈕組成注音小鍵盤，除了注音輸入鍵外，還有符號輸入鍵，放置在空白鍵左右的為方向鍵，另外還有控制鍵(？按鈕)。
keyboard 的排版由 keyboard.css 設定，注音輸入鍵的排列與一般常見的鍵盤類似，顏色部分則與 flash 版程式相同，主要依照發音方式進行配色。

selector (div) 為選擇預選字的介面，也是由多個按鈕組成，包含換頁按鈕和取消按鈕。程式會在需要進行選字時自動切入此介面。
selector 的排版由 selector.css 設定。

controller (div) 為進行一些非輸入操作的輸入介面，包含複製文字、複製注音、儲存成圖片、朗讀文章等操作。可由 keyboard 裡的？按鈕切入此介面，controller 最底下有取消按鈕可以返回 keyboard 介面。
setting (div) 為設定介面，目前只有大小的設定。可由 controller 最底下的設定按鈕切入此介面，這裡也有取消按鈕可以返回 keyboard 介面。
controller 和 setting 的排版由 controller.css 設定。

#操作與運作原理
本程式的運作主要可以三個部分：資料庫的存取，CChar 的定義和元件的操作。

資料庫的部分，包含實作查詢動作的 query.js，提供查詢服務的 phonetab.php，和紀錄預選字資料的 phonetab 表格，另外還有輔助與資料庫建立連線的 mysql_config.php。

###phonetab
phonetab 表格有三個欄位：id, phone, text，分別記錄序號、注音、預選字，資料型別分別為 int, varchar(5), varchar(1)，因為要記錄的是中文，因此 varchar 必須採用 utf8 編碼。
如果想要建立資料庫，可以使用 build_db.php 建立，它會建立一個表格，並讀取 meta 資料夾底下的 phonetab.txt 存入資料庫。
資料庫的連線是由 mysql_config.php 處理的，因此如果要更換資料庫，只要修改這個檔案就行了。

###query.js
query.js 裡有 query_char( cchar ) 函式和紀錄符號的 punctuation 陣列，其中 query_char( cchar ) 會以 XMLHttpRequest 與 phonetab.php 溝通，並將結果回傳。如果是要輸入符號，直接存取 punctuation 陣列就行了。

###phonetab.php
phonetab.php 會接受 POST 的請求，其中包含一個紀錄注音的 zhuyin 參數，phonetab.php 會以此(作為 phone 欄位)查詢 phonetab 裡對應的預選字(text 欄位)，並將所有的結果直接串起來回傳給 client 端，如果沒有結果就不回傳任何東西。

##CChar
CChar 為 Chinese Character 的縮寫，為帶有注音符號的中文字，主要定義在 CChar.js 底下，print.js 則定義了將 CChar 印在 canvas 上的方法。

###CChar.js
CChar 包含 text 和 phones 兩個欄位。text 為中文字元，phones 為注音符號字元陣列，其中 phones[0] 為聲調符號；phones[1] 為韻母符號；phones[2] 為介母符號；phones[3] 為聲母符號。
在 CChar.js 底下定義了 getPhoneColumn(), getPhoneSide(), getPhoneString(), putPhone( phone ), deletePhone( i ) 這些函式。

 - CChar( text, phones ) 為 CChar 的建構子，其中 phones 可以為 undefined, array, string，若為 undefined，CChar.phones 就會是空陣列；若為 array，它會將裡面的元素作為注音符號使用 putPhone( phone ) 放進去；若為 string，則會先把它分割成單個字元再以 putPhone( phone ) 放進去。

 - getPhoneColumn(), getPhoneSide() 是用於印出注音用的，getPhoneColumn() 會依照注音的排法輸出一個注音陣列，但不包含輕聲以外的聲調符號，例如 [ ㄏ, ㄚ ], [ ㄨ, ㄛ ], [ ˙, ㄉ, ㄜ ]，相對地 getPhoneSide() 會輸出輕聲以外的聲調符號。

 - getPhoneString() 主要是用於查詢的，與 getPhoneColumn() 不同的是，它會將音調符號接在最後面，例如 [ ㄏ, ㄚ ], [ ㄨ, ㄛ, ˇ ], [ㄉ, ㄜ, ˙ ]。

 - putPhone( phone ) 可以把注音符號放進 CChar 裡，若相對的符號已存在，則會直接取代。

 - deletePhone( i ) 可以刪除特定的注音符號。若 i 為 undefined，則會先試圖刪除 phones[0]，若原本就為 undefined，再依序試圖刪除 phones[3], phones[2], phones[1]。

###print.js
print.js 定義了 measureCChar( cx, size, cchar ), printCChar( cx, size, cchar ), printBackGround( cx, size, width, st ), printCursor( cx, size, width ), printCChars( cx, text_size, line_spacing, total_cchar, hightlight )。

 - measureCChar( cx, size, cchar ) 會利用 cx (canvas context) 量測在 size 的字元大小(高度為 size px)下，cchar 印出來會有多少寬度。原則上相同的 size 量到的寬度應該是一樣的。

 - printCChar( cx, size, cchar ) 會將 cchar 以 size 的字元大小印在 cx，其中 textAlign 會被設定為 left，textBaseline 則為 middle。

 - printBackGround( cx, size, width, st ) 會計算字元印出的範圍，並以 st 作為 fillStyle 印在 cx 上。printCursor( cx, size, width ) 則會印出 cursor。

 - printCChars( cx, text_size, line_spacing, total_cchar, hightlight ) 會將 total_cchar(CChar array) 印在 cx 上，其中包含自動換行，因此還需要指定 line_spacing。hightlight(string array) 則代表各個字元的渲染效果，相對於 total_cchar 位置的元素代表這個字元應該怎麼渲染，其中的元素可以是 undefined, 'focus', 'warning', 'edit', 'select'。undefined 代表沒有渲染效果；'focus' 則會以 printCursor 印出游標；其他的會以 printBackGround 印出背景，其中背景的 fillStyle 定義在 hightlight_style。

##元件操作
有關各個元件的操作，都是由其他的 js 檔分別實作的，分別為 textarea.js, inputboard.js, selector.js, keyboard.js, controller.js。
為了讓程式具有更好的延展性，這些 js 檔都跟 html 裡的元件分離，也就是幾乎沒有 getElementById 等與 id, class, name 有關的函式，因此 index.html 必須先初始化，程式才能正常運作。需要初始化的元件為 textarea, selector，必須使用 text_init( canvas ), text_set( cchars ), sel_init( items, sel_previous, sel_next ) 這些函式初始化。

###textarea
textarea.js 主要實作 textarea 的操作模式，因為 textarea 是輸出端，因此在這裡盡量不把操作寫死，以因應不同的輸入方式，雖然目前只有 keyboard 這一種輸入方式。
textarea 提供一些方法操控 cchar_text，其操作模式以盡量模擬一般的文字編輯器和注音輸入法為主，主要可以分成 edit/warning mode 和 focus mode 兩個狀態。edit/warning mode 就是輸入注音的過程，在這裡提供了 text_edit_start(), text_edit_warning(), text_edit_editing(), text_edit_abandon(), text_edit_finish() 等函式；focus mode 則是可以自由移動、插入刪除字元的狀態，這裡提供了 text_del(), text_backspace(), text_insert( cchar ), text_privous(), text_next() 等函式。另外還有 input_mode, text_current() 等可以輔助操作。

 - text_init( canvas, canvaswidth, textsize, linespacing ) 因為 canvas 的大小調整必須連同 style 也一起調整(canvas.width, canvas.height, canvas.style.width, canvas.style.height)，才不會出現變形的情形，因此需要輸入 canvaswidth 以初始化 canvas。另外 textsize, linespacing 可以為 undefined。text_init 會把這些資訊紀錄在全域變數 text_canvas, canvas_width, text_size, line_spacing。

 - text_set( cchars ) 會把 cchars 設定為一開始輸出在 textarea 上的文章，若沒有就放入空陣列初始化。text_set 會把 cchars 紀錄在全域變數 cchar_text。

 - text_repaint() 會將 cchar_text 重新印在 text_canvas 上。textarea.js 會以橫式書寫的方式印出 CChar，並會自動調整 canvas 的長度。

 - input_mode 代表操作模式，可以是 'edit', 'warning', 'focus' 三個值。

 - text_current() 會回傳目前指向的 cchar。

 - text_edit_start() 會將操作模式由 focus 轉換成 edit，並插入新字元。

 - text_edit_warning() 會將操作模式由 edit 轉換成 warning。text_edit_editing() 則會將操作模式由 warning 轉換成 edit。

 - text_edit_abandon() 為捨棄編輯，操作模式會由 edit 轉換成 focus，並刪除編輯的字元。text_edit_finish() 則為完成編輯，操作模式會由 edit 轉換成 focus，並將指標指向下一個字元。

 - text_del() 會刪除目前指向的字元，text_backspace() 則會刪除前一個字元。

 - text_insert( cchar ) 會插入新字元並將指標移向下一個字元。

 - text_privous() 會把指標移向前一個字元。text_next() 則會把指標移向下一個字元。

###keyboard, selector
selector.js, keyboard.js 分別實作了 selector, keyboard 上各個按鍵的動作。
有關輸入介面的切換方法，定義在 inputboard.js 裡的 toggle_inputboard( board )。

 - sel_init( it, pre, next ) 為初始化 selector 的方法，it 為選擇介面裡的各個選項按鈕；pre 為上一頁的按鈕；next 為下一頁的按鈕。

 - sel_set( sels ) 為設定選項的函式，sels 為預選字陣列。此函式會將預選字依序放入選項按鈕，如果不夠放則會開起換頁功能。

 - sel_previous_page() 會顯示上一頁的預選字。

 - sel_next_page() 會顯示下一頁的預選字。

 - sel_esc() 為按下取消的動作。…

 - select( button ) 為按下某一個選項的動作。…

 - keyin( phone ) 為按下注音鍵時的動作。…

 - tone( tone ) 為按下聲調鍵時的動作。…

 - space() 為按下空白鍵的動作。…

 - dot() 為按下符號鍵(，按鈕)的動作。…

 - backspace() 為按下刪除鍵(←按鈕)的動作。…

 - left(), right(), up(), down() 為按下方向鍵的動作。…

注: "…" 代表還有一些細節未寫完，因為太複雜了懶得寫。有關這些細節請見 demo.pdf。

###controller, setting
controller, setting 裡按鈕的動作都實作在 controller.js 裡。

 - ctrl_copy_text() 會擷取 textarea 上內容的文字部分，並以 prompt 的方式讓使用者複製。

 - ctrl_copy_phone() 會擷取 textarea 上內容的注音部分(每個字的注音間會以空白隔開)，並以 prompt 的方式讓使用者複製。

 - ctrl_save_img() 會將 canvas 直接儲存成 png 圖檔。

 - ctrl_read() 會將 textarea 上的內容利用 google translate 念出來。

 - ctrl_resize( size ) 會調整畫面大小，目前只有提供 'big', 'small' 兩種 size。此函式會重新載入對應的 css 檔和重新初始化 canvas 以調整畫面大小。
