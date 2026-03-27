import { Router } from "express";
import models from "../models";

const router = Router();

router.get("/", async (req, res) => {
  try {
     
    const users = await req.context.models.User.findAll();
    return res.status(users.length == 0 ? 204 : 200).send(users);
  } catch (error) {
    return res.status(500).json({
      message: 'erro interno do servidor',
      erro: error
    });
  }
});

router.get("/:userId", async (req, res) => {
  try {
     
    const user = await req.context.models.User.findByPk(req.params.userId);
    return res.status(user == null? 404: 302).send(user);
  } catch (error) {
    return res.status(500).json({
      message: 'erro interno do servidor',
      erro: error
    });
  }
});

router.post("/", async (req, res) => {
  try {
     
    const { username, email } = req.body;
    if (!username || !email) {
      return res.status(400).json({
        body: req.body,
        text: "Está faltando informações"
      });
    } else {
      await models.User.create(
        {
          username: username,
          email: email,
          messages: []
        },
        {
          include: [models.Message]
        }
      )
    }
    return res.status(201).json({
      body: req.body,
      text: "requisicao enviada"
    })
  } catch(error) {
    return res.status(500).json({
      message: 'erro interno do servidor',
      erro: error
    });
  }
});

router.put("/:userId", async (req, res) => {
  try {
     
    const { id } = req.params;

    const [updated] = await User.update(req.body, {
      where: { id }
    });

    if (updated) {
      const user = await User.findByPk(id);
      return res.status(205).json(user);
    }

    return res.status(404).json({ error: 'Usuário não encontrado' });

  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar' });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
     
    const { id } = req.params;

    const deleted = await User.destroy({
      where: { id }
    });

    if (deleted) {
      return res.status(200).json({ message: 'Usuário deletado' });
    }

    return res.status(404).json({ error: 'Usuário não encontrado' });

  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar' });
  }
});

export default router;