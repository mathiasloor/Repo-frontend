{/* Importar Componentes de React */}
import React        from 'react';
import { observer } from 'mobx-react';
{/* Importar Componentes Creados por el Desarrollador */}
import UserStore    from './stores/UserStore';
import LoginForm    from './LoginForm';
import InputField   from './InputField';
import SubmitButton from './SubmitButton';
import './App.css';

{/* Creaar Clase App */}
class App extends React.Component {

  /* Recuperación de Datos Cuando se Monta un Componente */
  async componentDidMount() {

    try {

      let res = await  fetch('/isLoggedIn', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'applicaion/json'
        }
      });

      let result = await res.json();

      if (result && result.success){
        UserStore.loading = false;
        UserStore.isLoggedIn = true;
        UserStore.username = result.username;
      }

      else{
        UserStore.loading = false;
        UserStore.isLoggedIn = false;
      }
    }
    
    catch(e){
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }
  }

  /* Método que se Llamará Cuando el Usuario Haga Clic en el Botón de Cierre de Sesión */
  async doLogout() {

    try {

      let res = await  fetch('/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-type': 'applicaion/json'
        }
      });

      let result = await res.json();

      if (result && result.success){
        UserStore.isLoggedIn = false;
        UserStore.username = '';
      }

      
    }
    
    catch(e){
      console.log(e)
    }
  }

  /* Renderiza un elemento React al DOM en el contenedor suministrado y retorna 
    una referencia al componente (o devuelve null para componentes sin estado). */
    render(){

    if (UserStore.loading) {
      return(
        <div className="app">
          <div className='container'>
            Loading, please wait...
          </div>
        </div>
      );
    }

    else {
      if (UserStore.isLoggedIn) {
        return(
          <div className="app">
            <div className='container'>
              Welcome {UserStore.username}

              <SubmitButton
                text={'Log out'}
                disabled={false}
                onClick={ () => this.doLogout() }
                />

            </div>
          </div>
        );
      }
    

    return (
      <div className="app">
        <div className='container'>
          <LoginForm />
        </div>
      </div>
    );
  }
}
}

{/*  Exportar una sola clase, función o primitiva desde un archivo de script. */}
export default observer(App);