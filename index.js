let numeroSecreto;
        let intervaloCronometro;

        // Função para iniciar ou reiniciar o jogo
        function iniciarJogo() {
            // O computador escolhe um número aleatório entre 1 e 10
            numeroSecreto = Math.floor(Math.random() * 10) + 1;
            // Limpa a mensagem, o campo de palpite anterior e o cronômetro
            document.getElementById('mensagem').textContent = '';
            document.getElementById('palpite').value = '';
            document.getElementById('cronometro').textContent = '';
            clearInterval(intervaloCronometro);
        }

        // Função para iniciar o cronômetro
        function iniciarCronometro(duracao) {
            let tempoRestante = duracao;
            const cronometroElemento = document.getElementById('cronometro');
            cronometroElemento.textContent = `Tempo restante: ${tempoRestante}s`;
            
            intervaloCronometro = setInterval(() => {
                tempoRestante--;
                cronometroElemento.textContent = `Tempo restante: ${tempoRestante}s`;
                
                if (tempoRestante <= 0) {
                    clearInterval(intervaloCronometro);
                    document.getElementById('mensagem').textContent = '';
                    cronometroElemento.textContent = '';
                }
            }, 1000);
        }

        // Função para verificar o palpite do jogador
        function verificarPalpite() {
            // Obtém o palpite do jogador
            const palpite = parseInt(document.getElementById('palpite').value);
            // Obtém o elemento onde a mensagem será exibida
            const mensagem = document.getElementById('mensagem');

            // Verifica se o palpite está dentro do intervalo permitido
            if (isNaN(palpite) || palpite < 1 || palpite > 10) {
                mensagem.textContent = "Por favor, insira um número entre 1 e 10.";
                mensagem.style.color = "orange";
                return;
            }

            // Verifica se o palpite está correto
            if (palpite === numeroSecreto) {
                mensagem.textContent = "Parabéns! Você acertou!";
                mensagem.style.color = "green";
                // Reinicia o jogo após 2 segundos
                setTimeout(iniciarJogo, 2000);
            } else {
                mensagem.textContent = `Que pena! O número era ${numeroSecreto}. Tente novamente!`;
                mensagem.style.color = "red";
                // Limpa o campo de palpite após 2 segundos
                setTimeout(() => document.getElementById('palpite').value = '', 2000);
            }

            // Inicia o cronômetro de 5 segundos
            iniciarCronometro(5);
        }

        // Função para tratar o evento de pressionar a tecla Enter
        function tratarTeclaEnter(event) {
            if (event.key === 'Enter') {
                verificarPalpite();
            }
        }

        // Adiciona o listener para a tecla Enter no campo de palpite
        document.getElementById('palpite').addEventListener('keypress', tratarTeclaEnter);

        // Inicia o jogo quando a página é carregada
        iniciarJogo();