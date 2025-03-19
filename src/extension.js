const vscode = require("vscode");

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "code-charms.showPanel",
    () => {
      const panel = vscode.window.createWebviewPanel(
        "codeCharms",
        "Code Charms",
        vscode.ViewColumn.Beside,
        {
          enableScripts: true,
          retainContextWhenHidden: true,
          localResourceRoots: [
            vscode.Uri.joinPath(context.extensionUri, "media"),
          ],
        }
      );

      // Obtener recursos
      const koalaUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "media", "koala.png")
      );
      const medusaUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "media", "medusa.png")
      );
      const bubbleUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "media", "burbujas.png")
      );
      const cloudUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "media", "nube.png")
      );
      const fondoAzulUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "media", "fondoAzul.png")
      );
      const fondoKoalaUri = panel.webview.asWebviewUri(
        vscode.Uri.joinPath(context.extensionUri, "media", "fondoKoala.jpg")
      );

      panel.webview.html = getWebviewContent(
        koalaUri,
        medusaUri,
        bubbleUri,
        cloudUri,
        fondoAzulUri,
        fondoKoalaUri
      );
    }
  );

  context.subscriptions.push(disposable);
}

function getWebviewContent(
  koalaUri,
  medusaUri,
  bubbleUri,
  cloudUri,
  fondoAzulUri,
  fondoKoalaUri
) {
  return `<!DOCTYPE html>  
<html>  
<head>  
    <style>  
        @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&display=swap');  
        
        body {  
            margin: 0;  
            padding: 0;  
            overflow: hidden;  
            background: transparent !important;  
        }  

        .container {  
            position: fixed;  
            bottom: 20px;  
            right: 20px;  
            width: 300px;  
            height: 300px;  
            border-radius: 15px;  
            overflow: hidden;  
            background: rgba(30,30,30,0.15);  
            backdrop-filter: blur(4px);  
            border: 1px solid rgba(255,255,255,0.15);  
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);  
            animation: slideIn 0.5s cubic-bezier(0.23, 1, 0.32, 1);  
        }  

        .selector {  
            position: absolute;  
            top: 10px;  
            right: 10px;  
            display: flex;  
            gap: 8px;  
            z-index: 9999;  
        }  

        button {  
            background: linear-gradient(145deg, rgba(60,60,60,0.95), rgba(40,40,40,0.95));  
            color: white;  
            border: none;  
            padding: 8px 18px;  
            border-radius: 20px;  
            cursor: pointer;  
            font-family: system-ui;  
            font-weight: 600;  
            font-size: 0.95em;  
            transition: all 0.2s;  
        }  

        button:hover {  
            transform: scale(1.05);  
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);  
        }  

        .animation-container {  
            position: relative;  
            width: 100%;  
            height: 100%;  
            overflow: hidden;  
        }  

        .oceano {  
            position: absolute;  
            width: 100%;  
            height: 100%;  
            background: url('${fondoAzulUri}') center/cover;  
            opacity: 0.8;  
            z-index: 0;  
            filter: hue-rotate(10deg) blur(1px);  
        }  

        .fondo-koala {  
            position: absolute;  
            width: 100%;  
            height: 100%;  
            background: url('${fondoKoalaUri}') center/cover;  
            opacity: 0.9;  
            z-index: 0;  
            filter: brightness(0.8) contrast(1.1);  
        }  

        .jellyfish {  
            position: absolute;  
            animation: float 9s infinite ease-in-out;  
            opacity: 0.85;  
            z-index: 2;  
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));  
        }  

        .bubble-img {  
            position: absolute;  
            animation: bubble 7s infinite linear;  
            opacity: 0.6;  
            z-index: 3;  
        }  

        .zzz {  
            position: absolute;  
            color: white;  
            font-family: 'Comic Neue', cursive;  
            font-size: 24px;  
            font-weight: bold;  
            animation: zzz 3s infinite cubic-bezier(0.4, 0, 0.6, 1);  
            opacity: 0;  
            pointer-events: none;  
            filter: drop-shadow(0 0 8px rgba(255,255,255,0.5));  
            z-index: 999;  
            text-shadow: 0 0 8px rgba(255, 255, 255, 0.5);  
        }  

        .cloud {  
            position: absolute;  
            animation: cloudMove 30s infinite linear;  
            opacity: 0.6;  
            width: 80px;  
            z-index: 0;  
        }  

        .koala-container {  
            position: absolute;  
            bottom: 30px;  
            left: 20%;  
            z-index: 2;  
            transform: scale(1.2);  
        }  

        @keyframes slideIn {  
            0% { transform: translateY(100%); opacity: 0; }  
            100% { transform: translateY(0); opacity: 1; }  
        }  

        @keyframes float {  
            0%, 100% { transform: translateY(0) rotate(-5deg); }  
            50% { transform: translateY(-25px) rotate(5deg); }  
        }  

        @keyframes bubble {  
            0% { opacity: 0; transform: translateY(0); }  
            30% { opacity: 0.9; }  
            100% { opacity: 0; transform: translateY(-200px); }  
        }  

        @keyframes zzz {  
            0% { opacity: 0; transform: translate(-15px, 0) scale(0.8); }  
            50% { opacity: 0.8; transform: translate(0, -40px) scale(1.2); }  
            100% { opacity: 0; transform: translate(15px, -80px) scale(0.8); }  
        }  

        @keyframes cloudMove {  
            0% { left: -100px; }  
            100% { left: 100%; }  
        }  
    </style>  
</head>  
<body>  
    <div class="container">  
        <div class="selector">  
            <button id="koalaBtn">🐨 Koala</button>  
            <button id="medusaBtn">🎐 Medusa</button>  
        </div>  
        <div id="animContainer" class="animation-container"></div>  
    </div>  
    <script>  
        (function() {  
            const images = {  
                koala: "${koalaUri}",  
                medusa: "${medusaUri}",  
                bubble: "${bubbleUri}",  
                cloud: "${cloudUri}",  
                fondoAzul: "${fondoAzulUri}",
                fondoKoala: "${fondoKoalaUri}"  
            };  

            let animationIntervals = [];  
            let bubbleCount = 0;  
            const maxBubbles = 6;  

            function clearAnimations() {  
                animationIntervals.forEach(clearInterval);  
                animationIntervals = [];  
                document.getElementById('animContainer').innerHTML = '';  
                bubbleCount = 0;  
            }  

            function createZZZ() {  
                const zzz = document.createElement('div');  
                zzz.className = 'zzz';  
                zzz.textContent = 'Zzz';  
                zzz.style.left = Math.random() * 80 + 10 + '%';  
                zzz.style.bottom = '30%';  
                zzz.style.transform = 'translateX(-50%)';  
                setTimeout(() => zzz.remove(), 4000);  
                return zzz;  
            }  

            function createKoalaScene() {  
                const container = document.getElementById('animContainer');
                
                // Fondo del koala
                const fondo = document.createElement('div');
                fondo.className = 'fondo-koala';
                container.appendChild(fondo);

                const koalaContainer = document.createElement('div');  
                koalaContainer.className = 'koala-container';  
                
                const img = document.createElement('img');  
                img.src = images.koala;  
                img.style.width = '260px';  
                koalaContainer.appendChild(img);  
                container.appendChild(koalaContainer);  

                function createCloud() {
                    const cloud = document.createElement('img');  
                    cloud.className = 'cloud';  
                    cloud.src = images.cloud;  
                    cloud.style.top = Math.random() * 60 + 10 + '%';  
                    cloud.style.width = 80 + Math.random() * 60 + 'px';
                    
                    cloud.addEventListener('animationend', () => {
                        cloud.remove();
                    });

                    return cloud;
                }

                animationIntervals.push(  
                    setInterval(() => container.appendChild(createZZZ()), 2500),  
                    setInterval(() => {  
                        const existingClouds = container.getElementsByClassName('cloud').length;
                        if(existingClouds < 3) {
                            container.appendChild(createCloud());  
                        }
                    }, 20000)
                );  
            }  

            function createMedusaScene() {  
                const container = document.getElementById('animContainer');  
                
                // Fondo oceánico  
                const fondo = document.createElement('div');  
                fondo.className = 'oceano';  
                container.appendChild(fondo);  

                // Medusas  
                for(let i = 0; i < 5; i++) {  
                    const jelly = document.createElement('img');  
                    jelly.className = 'jellyfish';  
                    jelly.src = images.medusa;  
                    jelly.style.width = (80 + Math.random() * 60) + 'px';  
                    jelly.style.left = (Math.random() * 90) + '%';  
                    jelly.style.bottom = (Math.random() * 50) + 20 + '%';  
                    jelly.style.animationDuration = (8 + Math.random() * 4) + 's';  
                    container.appendChild(jelly);  
                }  

                // Burbujas  
                function createBubble() {  
                    if(bubbleCount >= maxBubbles) return null;  
                    const bubble = document.createElement('img');  
                    bubble.className = 'bubble-img';  
                    bubble.src = images.bubble;  
                    bubble.style.width = (15 + Math.random() * 20) + 'px';  
                    bubble.style.left = Math.random() * 95 + '%';  
                    bubble.style.bottom = '10px';  
                    bubble.onanimationend = () => {  
                        bubble.remove();  
                        bubbleCount--;  
                    };  
                    bubbleCount++;  
                    return bubble;  
                }  

                animationIntervals.push(  
                    setInterval(() => {  
                        if(Math.random() < 0.25) {  
                            const bubble = createBubble();  
                            if(bubble) container.appendChild(bubble);  
                        }  
                    }, 6000)  
                );  
            }  

            function showAnimation(type) {  
                clearAnimations();  
                type === 'koala' ? createKoalaScene() : createMedusaScene();  
            }  

            document.addEventListener('DOMContentLoaded', () => {  
                document.getElementById('koalaBtn').addEventListener('click', () => showAnimation('koala'));  
                document.getElementById('medusaBtn').addEventListener('click', () => showAnimation('medusa'));  
                showAnimation('koala');  
            });  
        })();  
    </script>  
</body>  
</html>`;
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
