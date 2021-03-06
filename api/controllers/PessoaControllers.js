const database = require('../models');
const Sequelize = require('sequelize');

const {PessoasServices} = require ('../services')
const pessoasService = new PessoasServices()

class PessoaController{
    static async pegaPessoasAtivas(req, res){
        try{    
        const pessoasAtivas = await pessoasService.pegaRegistrosAtivos();
        return res.status(200).json(pessoasAtivas)
        }
        catch(error){
            return res.status(500).json(error.message)
        }
    }
     static async pegaTodasAsPessoas(req, res){
        try{
        //faz todas as queries necessarias/findAll/
        const todasAsPessoas = await pessoasService.pegaTodosOsRegistros();
        return res.status(200).json(todasAsPessoas)
        }
        catch(error){
            return res.status(500).json(error.message)
        }
    }

    //usa a pagina principal para buscar dados através do Query
    //mostra a pagina e o limite de registros
    static async pegaPessoasPagina(req, res){
        try{
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.page);
        const offset = (page - 1) * limit;
        const teste = {}

        if(page < offset || page > offset){
        teste.proximo = {
            pagina: page+1
        }}

        if(page > 1){
        teste.anterior = {
            pagina: page-1,
        }
        }
        const pessoas = await database.Pessoas.findAll(
            {
            limit: Number(limit),
            offset: Number(offset)
        }
        );

        teste.Alunos = pessoas

        return res.status(200).json(teste);
        //não retorna a paginação com o .Alunos
        }
        catch(error){
            return res.status(500).json(error.message)
        }
    }

/* 
        const pessoas = await database.Pessoas.findAll({
            where: {
            },
            limit: Number(limit),
            offset: Number(offset)
        })
            return res.json(pessoas)
        }catch(error){
            return res.status(500).json(error.message)
    }
    } */
    
        //busca pelo nome da pessoa através do Query
        static async buscaPessoas(req, res){
            const nome = req.query.nome;
            try{
                const pessoas = await database.Pessoas.findAll({
                    where: {
                        'nome':nome
                    }
                })
                return res.status(200).json(pessoas)
            }catch(error){
                return res.status(500).json(error.message)
            }
        }


    static async pegaUmaPessoa(req, res){
        const {id} = req.params;
        try{
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id:Number(id)
                } 
            });
            return res.status(200).json(umaPessoa)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async criaPessoa(req, res){
        const novaPessoa = req.body
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa);
            return res.status(200).json(novaPessoaCriada)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async atualizaPessoa(req, res){
        const {id} = req.params;
        const novasInfo = req.body;
        try{
            await database.Pessoas.update(novasInfo, {where: {id: Number(id)}})
            const pessoaAtualizada = await database.Pessoas.findOne({where: {id:Number(id)}});

            return res.status(200).json(pessoaAtualizada);
        }catch(error){
            return res.status(500).json(error.message)    
        }
    }

    static async apagaPessoa(req, res){
        const { id } = req.params
        try{
            await database.Pessoas.destroy({where: { id: Number(id)}})
            return res.status(200).json({mensage:`id ${id} deletado`})
        }catch(error){
            return res.status(500).json(error.message);   
        }
    }

    static async restauraPessoa(req, res){
        const{id} = req.params;
        try{
            await database.Pessoas.restore({where: {id: Number(id)}})
            return res.status(200).json({mensagem: `id ${id} restaurado`})
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegaUmaMatricula(req, res){
        const {estudanteId, matriculaId} = req.params;
        try{
            const umaMatricula = await database.Matriculas.findOne({
                where: {
                    id:Number(matriculaId),
                    estudante_Id: Number(estudanteId)
                } 
            });
            return res.status(200).json(umaMatricula)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }
    static async pegaMatriculasPorTurma(req, res){
        const {turmaId} = req.params;
        try{
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'confirmado'
                },
                limit: 20,
                order: [['estudante_id', 'ASC']]
            })
            return res.status(200).json(todasAsMatriculas)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    //contagem de registros
    static async pegaTurmasLotadas(req, res){
        const lotacaoTurma = 2
        try{
            const turmasLotadas = await database.Matriculas.findAndCountAll({
                where:{
                    status: 'confirmado'
                },
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) > ${lotacaoTurma}`)
            })
            return res.status(200).json(turmasLotadas.count)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async criaMatricula(req, res){
        const {estudanteId} = req.params
        const novaMatricula = {...req.body, estudante_id:Number(estudanteId)}
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula);
            return res.status(200).json(novaMatriculaCriada)
        }catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async atualizaMatricula(req, res){
        const {estudanteId, matriculaId} = req.params;
        const novasInfo = req.body;
        try{
            await database.Matriculas.update(novasInfo, {where: {id: Number(MatriculaId), estudante_id: Number(estudanteId)}})
            const matriculaAtualizada = await database.Matriculas.findOne({where: {id:Number(matriculaId)}});

            return res.status(200).json(matriculaAtualizada);
        }catch(error){
            return res.status(500).json(error.message)    
        }
    }

    static async apagaMatricula(req, res){
        const {estudanteId, matriculaId} = req.params;
        try{
            await database.Matriculas.destroy({where: {id: Number(matriculaId)}})
            return res.status(200).json({mensage:`a matricula ${matriculaId} foi deletada`})
        }catch(error){
            return res.status(500).json(error.message);   
        }
    }

    static async pegaMatriculas(req, res){
        const {estudanteId} = req.params;
        try{
            const pessoa = await database.Pessoas.findOne({where: {id: Number(estudanteId)}})
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        }catch(error){
            return res.status(500).json(error.message);   
        }
    }

    static async cancelaPessoa(req, res){
        const {estudantId} = req.params
        try{
            await pessoasService.cancelaPessoasEMatriculas(Number(estudanteId))            
            return res.status(200).json({message: `matriculas referentes ao ${estudantId} canceladas`})
            }catch(error){
            return res.status(500).json(error.message)
        }
    }
}

module.exports = PessoaController;
