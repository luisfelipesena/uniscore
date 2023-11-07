import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../database/db'
import nodemailer from 'nodemailer';
const jwtSecret = process.env.JWT_SECRET || '4queijos';

export async function registrarUsuario(req: Request, res: Response) {
  const { nome, email, senha } = req.body;

  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    const query = 'INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3) RETURNING id, nome, email';
    const values = [nome, email, senhaCriptografada];
    const result = await pool.query(query, values);

    const usuarioRegistrado = result.rows[0];
    res.status(201).json(usuarioRegistrado);
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

export async function loginUsuario(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await pool.query(query, values);

    const usuario = result.rows[0];
    if (usuario && await bcrypt.compare(senha, usuario.senha)) {
      const token = jwt.sign({ id: usuario.id, nome: usuario.nome }, jwtSecret, { expiresIn: '8h' });
      res.json({ usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email }, token });
    } else {
      res.status(401).json({ mensagem: 'Credenciais inválidas' });
    }
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ mensagem: 'Erro interno do servidor' });
  }
}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'uniescore@gmail.com',
      pass: 'uniescore2023',
    },
  });
  
  function gerarTokenRedefinicaoSenha(email: string): string {
    const segredo = process.env.JWT_SECRET || '4queijos';
    const token = jwt.sign({ email }, segredo, { expiresIn: '1h' });
    return token;
  }
  
  export async function esqueciMinhaSenha(req: Request, res: Response) {
    const { email, corpoEmail } = req.body;
  
    try {
      const usuario = await pool.oneOrNone('SELECT * FROM usuarios WHERE email = $1', [email]);
      
      if (usuario) {
        const tokenRedefinicaoSenha = gerarTokenRedefinicaoSenha(email);
        
        await pool.none('INSERT INTO pedidos_redefinicao_senha (email, token) VALUES ($1, $2)', [email, tokenRedefinicaoSenha]);
  
        const mailOptions = {
          from: 'uniescore@gmail.com',
          to: email,
          subject: 'Redefinição de senha',
          text: corpoEmail + `\n\nClique no link a seguir para redefinir sua senha: http://localhost:3000/redefinir-senha?token=${tokenRedefinicaoSenha}`, // Corpo do e-mail passado do frontend
        };
  
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Erro ao enviar e-mail de redefinição de senha:', error);
            res.status(500).json({ mensagem: 'Erro interno do servidor ao enviar o e-mail de redefinição de senha.' });
          } else {
            console.log('E-mail de redefinição de senha enviado: ' + info.response);
            res.json({ mensagem: 'Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail registrado.' });
          }
        });
      } else {
        res.status(404).json({ mensagem: 'E-mail não encontrado.' });
      }
    } catch (error) {
      console.error('Erro ao solicitar redefinição de senha:', error);
      res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
  }