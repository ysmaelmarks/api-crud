const { Router } = require ('express')
const PessoaController = require ('../controllers/PessoaControllers')

const router = Router()

router
.get('/pessoas', PessoaController.pegaTodasAsPessoas)
.get('/pessoas/ativas', PessoaController.pegaPessoasAtivas)
.get('/pessoas/:id', PessoaController.pegaUmaPessoa)
.post('/pessoas', PessoaController.criaPessoa)
.put('/pessoas/:id', PessoaController.atualizaPessoa)
.delete('/pessoas/:id', PessoaController.apagaPessoa)
.post('/pessoas/:id/restaura/', PessoaController.restauraPessoa)
.get('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.pegaUmaMatricula)
.get('/pessoas/:estudanteId/matricula', PessoaController.pegaMatriculas)
.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.pegaMatriculasPorTurma)
.get('/pessoas/matricula/lotada', PessoaController.pegaTurmasLotadas)
.post('/pessoas/:estudanteId/matricula/',PessoaController.criaMatricula)
.post('/pessoas/:estudanteId/cancela',PessoaController.cancelaPessoa)
.put('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.atualizaMatricula)
.delete('/pessoas/:estudanteId/matricula/:matriculaId', PessoaController.apagaMatricula)

module.exports = router