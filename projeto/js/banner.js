        var imagens = [
            "1.jpg",
            "2.jpg",
            "3.png",
        ];
        
        var indice = 0;

        var banner = document.getElementById('animacao')

        function mostrarImagens(){
            banner.src = imagens[indice];
        }
        function Ir(){
            indice++;
            if(indice >=imagens.legth){
                indice = 0;
            }
            mostrarImagens();

        }
        function voltar(){
            indice--;
            if(indice < 0){
                indice = imagens.length - 1;
            }
            mostrarImagens();
        }