document.getElementById('walletLoginButton').addEventListener('click', async () => {
    try {
        // Verifica se a Phantom está disponível
        if (window.solana && window.solana.isPhantom) {
            // Conecta à carteira Phantom
            await window.solana.connect();
            const publicKey = window.solana.publicKey.toString();
            console.log('Carteira Phantom conectada:', publicKey);
            alert('Carteira Phantom conectada: ' + publicKey);
        } 
        // Opcional: Verifica MetaMask como fallback
        else if (window.ethereum) {
            // Conecta à MetaMask
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            console.log('Carteira MetaMask conectada:', accounts[0]);
            alert('Carteira MetaMask conectada: ' + accounts[0]);
        } 
        else {
            alert('Nenhuma carteira detectada. Instale a Phantom ou MetaMask.');
        }
    } catch (error) {
        console.error('Erro ao conectar a carteira:', error);
        alert('Erro ao conectar a carteira. Veja o console para detalhes.');
    }
});
