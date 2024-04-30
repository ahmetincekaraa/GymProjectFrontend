export const loginSuccess = (token) => {
    localStorage.setItem('userData', JSON.stringify(token)); // Oturum bilgilerini local storage'a kaydet
    localStorage.setItem('token', JSON.stringify(token.token)); // Oturum bilgilerini local storage'a kaydet
  
    return {
        type: 'LOGIN_SUCCESS',
        payload: token
      };
    };
  
  
    export const loginFailure = (error) => {
      return {
        type: 'LOGIN_FAILURE',
        payload: error
      };
    };
    
    export const LOGOUT = 'LOGOUT';
  
    export const logout = () => {
      localStorage.removeItem('userData'); // Oturum bilgilerini local storage'dan kaldır
  
      return (dispatch) => {
        // Logout işlemi için önce token temizleme veya gerekli işlemleri gerçekleştirme
        // Örnek olarak token temizleme
        localStorage.removeItem('token');
        // Sonra Redux store'dan logout eylemini dispatch etme
        dispatch({ type: LOGOUT });
        // Daha sonra giriş sayfasına yönlendirme
  
      };
    };

    export const signUpSuccess = (token) => {
      return {
        type: 'SIGNUP_SUCCESS',
        payload: token
      };
    };
    
    export const signUpFailure = (error) => {
      return {
        type: 'SIGNUP_FAILURE',
        payload: error
      };
    };