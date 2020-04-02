exports.isLogged = (req, res, next) => {
 if(!req.isAuthenticated()) {
  req.flash('error', 'Ops! Você não tempermissão para acessar está página.');
  res.redirect('/users/login');
  return;
 }

 next();
};

exports.changePassword = (req, res) => {
 // 1. Confirma que senha batem.
 if(req.body.password != req.body['password-confirm']) {
  req.flash('error', 'Senha não batem');
  res.redirect('/profile');
  return;
 }
 // 2. Trocar a senha dele.
 req.user.setPassword(req.body.password, async () => {
  await req.user.save();

  req.flash('sucess', 'Senha alterada com sucesso!');
  // 3. Redirecionar para a HOME
  res.redirect('/');
 }); 
}