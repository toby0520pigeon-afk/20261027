let walkSprite; // 儲存角色的走路精靈圖片
let characterX; // 儲存角色目前的水平位置
let facingDirection = 1; // 儲存角色朝向，1 為右、-1 為左
let animationFrame = 0; // 儲存目前顯示的精靈影格
const frameCount = 4; // 設定精靈表中的影格數量
const spriteScale = 2; // 設定角色相對於原始圖片的放大倍率
const movementSpeed = 4; // 設定角色每 60 幀移動的像素數

function preload() { // 在畫布啟動前載入角色圖片
	walkSprite = loadImage('1/walk/all.png'); // 載入四格橫向走路精靈
} // 結束圖片載入函式

function setup() { // 初始化全螢幕畫布與角色位置
	createCanvas(windowWidth, windowHeight); // 建立符合視窗大小的畫布
	imageMode(CENTER); // 讓角色圖片以中心點定位
	characterX = width / 2; // 將角色放在畫面中央
} // 結束初始化函式

function draw() { // 每一幀更新畫面與角色狀態
	background('#FEFAE0'); // 使用指定的淡黃色填滿畫布
	const frameWidth = walkSprite.width / frameCount; // 計算每格精靈圖片的來源寬度
	const frameHeight = walkSprite.height; // 取得精靈圖片的來源高度
	const characterWidth = frameWidth * spriteScale; // 計算角色顯示寬度
	const characterHeight = frameHeight * spriteScale; // 計算角色顯示高度
	let horizontalInput = 0; // 初始化本幀的水平移動方向
	if (keyIsDown(LEFT_ARROW)) { // 檢查是否按住鍵盤左方向鍵
		horizontalInput -= 1; // 設定角色向左移動
	} // 結束左方向鍵判斷
	if (keyIsDown(RIGHT_ARROW)) { // 檢查是否按住鍵盤右方向鍵
		horizontalInput += 1; // 設定角色向右移動
	} // 結束右方向鍵判斷
	if (horizontalInput !== 0) { // 只有移動時才更新朝向與動畫
		facingDirection = horizontalInput; // 讓角色朝向目前的移動方向
		characterX += horizontalInput * movementSpeed * deltaTime / (1000 / 60); // 依經過時間平順移動角色
		animationFrame = floor(millis() / 120) % frameCount; // 以固定速度循環播放走路影格
	} else { // 角色停止移動時執行待機處理
		animationFrame = 0; // 停止時顯示第一格精靈圖片
	} // 結束移動狀態判斷
	if (width > characterWidth) { // 畫布夠寬時限制角色留在畫面內
		characterX = constrain(characterX, characterWidth / 2, width - characterWidth / 2); // 避免角色移出左右邊界
	} else { // 畫布比角色還窄時將角色保持在中央
		characterX = width / 2; // 將角色水平置中
	} // 結束水平邊界處理
	const characterY = max(characterHeight / 2, height - characterHeight / 2 - 24); // 將角色放在畫面底部並保留邊距
	push(); // 暫存目前的繪圖座標狀態
	translate(characterX, characterY); // 將繪圖原點移至角色位置
	scale(facingDirection, 1); // 朝左時水平翻轉角色圖片
	image(walkSprite, 0, 0, characterWidth, characterHeight, animationFrame * frameWidth, 0, frameWidth, frameHeight); // 繪製目前的精靈影格
	pop(); // 還原繪圖座標狀態
} // 結束每幀繪製函式

function windowResized() { // 視窗尺寸改變時更新畫布
	resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿整個視窗
} // 結束視窗縮放處理

function keyPressed() { // 攔截方向鍵以避免瀏覽器捲動頁面
	if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) { // 判斷是否按下左右方向鍵
		return false; // 阻止方向鍵觸發瀏覽器預設捲動
	} // 結束方向鍵判斷
} // 結束鍵盤事件處理
