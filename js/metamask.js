window.userWalletAddress = null
const loginButton = document.getElementById('metamaskLoginButton');
const logoutButton = document.getElementById('metamaskLogoutButton');
const userWallet = document.getElementById('metamaskUserWallet');

function toggleButton() {
    if (!window.ethereum) {
        loginButton.innerText = 'Wallet is not installed';
        // loginButton.classList.remove('bg-purple-500', 'text-white');
        // loginButton.classList.add('bg-gray-500', 'text-gray-100', 'cursor-not-allowed');
        return false
    }

    loginButton.addEventListener('click', loginWithMetaMask)
}

async function loginWithMetaMask() {
    // async function metamaskLogin(){

    $("#metamaskLoginButton").html('Connecting..');
    $("#metamaskLoginButton").attr('disabled', true);

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((e) => {
            console.error(e.message)
            return
        })
    if (!accounts) { return }

    window.userWalletAddress = accounts[0]
    // userWallet.innerText = window.userWalletAddress;
    // loginButton.innerText = 'Disconnect from MetaMask';

    var wallet_address1 = window.userWalletAddress;
    var wallet_address = wallet_address1.substr(0, 6) + '..' + wallet_address1.substr(wallet_address1.length - 4, wallet_address1.length);
    // console.log(wallet_address);


    $.ajax({
        type: 'POST',
        url: base_url + 'metamask-auth-process.php',
        data: {
            'wallet_address': wallet_address,
            'mwf': wallet_address1,
            'operation': 'login'
        },
        success: function (resp) {

            // logoutButton.style.display = 'block';
            // loginButton.style.display = 'none';
            // window.location.reload();
            window.location = base_url_dashboard + 'metamask-session.php?wallet_address=' + wallet_address + '&mwf=' + wallet_address1;
        }
    })

}

$("#metamaskLogoutButton").on('click', function () {

    // web3.currentProvider.disconnect();
    $.ajax({
        type: 'POST',
        url: base_url + 'metamask-auth-process.php',
        data: {
            'operation': 'logout',
        },
        success: function (resp) {
            // logoutButton.style.display = 'none';
            // loginButton.style.display = 'block';
            // window.location.reload();
            window.location = base_url;
        }
    })
})

window.addEventListener('DOMContentLoaded', () => {
    toggleButton()
});
