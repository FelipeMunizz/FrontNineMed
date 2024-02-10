export const config = {
  //apiUrl: 'http://localhost:5000/api',
  apiUrl: 'https://ninemed.azurewebsites.net/api',
  authRoles: {
    sa: ['Administrador'], 
    medico: [ 'Administrador','ProfissionalSaude'], 
    recepcao: ['Administrador', 'Recpcao'], 
  }
}

