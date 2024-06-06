'use client'
import { useState } from "react";
import Link from "next/link";
import { useForm } from 'react-hook-form';
import { useMediaQuery } from "@mui/material";
import { saludMental01 } from "@/components/imagepath";
import { FaArrowLeft } from "react-icons/fa";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Fragment } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const preguntas = [
  {
    pregunta: 'Torpe o entumecido.',
    label: 'torpe'
  },
  {
    pregunta: 'Acalorado',
    label: 'acalorado'
  },
  {
    pregunta: 'Con temblor en las piernas.',
    label: 'temblor'
  },
  {
    pregunta: 'Incapaz de relajarse.',
    label: 'incapaz'
  },
  {
    pregunta: 'Con temor a que ocurra lo peor.',
    label: 'temor'
  },
  {
    pregunta: 'Mareado, o que se le va la cabeza.',
    label: 'mareado'
  },
  {
    pregunta: 'Con latidos del corazón fuertes y acelerados.',
    label: 'latidos'
  },
  {
    pregunta: 'Inestable',
    label: 'inestable'
  },
  {
    pregunta: 'Atemorizado o asustado.',
    label: 'atemorizado'
  },
  {
    pregunta: 'Nervioso',
    label: 'nervioso'
  },
  {
    pregunta: 'Con sensación de bloqueo.',
    label: 'bloqueado'
  },
  {
    pregunta: 'Con temblores en las manos.',
    label: 'temblorenmanos'
  },
  {
    pregunta: 'Inquieto, inseguro.',
    label: 'inquiero'
  },
  {
    pregunta: 'Con miedo a perder el control.',
    label: 'perdercontrol'
  },
  {
    pregunta: 'Con sensación de ahogo.',
    label: 'ahogado'
  },
  {
    pregunta: 'Con temor a morir.',
    label: 'miedoamorir'
  },
  {
    pregunta: 'Con miedo.',
    label: 'conmiedo'
  },
  {
    pregunta: 'Con problemas digestivos.',
    label: 'digestion'
  },
  {
    pregunta: 'Con desvanecimientos.',
    label: 'desvanecimientos'
  },
  {
    pregunta: 'Con rubor facial.',
    label: 'ruborfacial'
  },
  {
    pregunta: 'Con sudores, frios o calientes.',
    label: 'sudores'
  }
]

const resultados = [
  {
    puntaje: [0, 21],
    titulo: 'Ansiedad muy baja',
    descripcion: 'Descripción'
  },
  {
    puntaje: [22, 35],
    titulo: 'Ansiedad moderada',
    descripcion: 'Descripción'
  },
  {
    puntaje: [36, 46],
    titulo: 'Ansiedad severa',
    descripcion: 'Descripción'
  },
]

const determinarDescripcion = (puntaje) =>
  resultados.find(({ puntaje: [min, max] }) => puntaje >= min && puntaje <= max) || 'Puntaje fuera de rango';

const ChildModal = ({ result }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
      <Button onClick={handleOpen}>Enviar correo</Button>
      <Button onClick={handleOpen}>Resultados anónimos</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style }}>
          <h2 id="child-modal-title">{result.titulo}</h2>
          <p id="child-modal-description">
            {result.descripcion}
          </p>
          <Button onClick={handleClose}>Cerrar</Button>
        </Box>
      </Modal>
    </Fragment>
  );
}

const TestAnsiedad = () => {
  const divRef = useRef();
  const [resultado, setResultado] = useState(null)
  const matches = useMediaQuery('(min-width:600px)');
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { register, handleSubmit, watch,
    formState: { errors }
  } = useForm()

  const calculate = () => {
    const data = watch()

    let values = Object.values(data);

    // Sumamos los valores
    let sum = values.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue), 0);
    setResultado(sum)
    console.log(sum)
  }

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
  })


  return (
    <>
      {matches && <div style={{
        height: '520px',
        overflow: 'hidden'
      }}>
        <img
          alt="#"
          src={saludMental01.src}
          width={'100%'}
          style={{
            backgroundPosition: 'center'
          }}
        />
      </div>
      }
      <div className="page-wrapper" style={{ margin: 'auto' }}>
        <div className="content">
          {/* Page Header */}
          {matches &&
            <button className='btn mt-4 mb-2'
              style={{
                border: '1px solid #A6A6A6',
                height: '56px',
                width: '163px',
                padding: '0px 24px',
                borderRadius: '100px',
                marginLeft: '76px'
              }}
              onClick={() => router.back()}
            >
              <FaArrowLeft /> Volver
            </button>
          }
          {/* /Page Header */}
          <div className="row">
            <div className="col-sm-12">
              <div className="card" style={{ border: 'none' }}>
                <div className="card-body">
                  <form>
                    <div className="row d-flex flex-column align-items-center">
                      <div className="col-12">
                        <div className="form-heading">
                          <div className="card-body flex-row d-flex justify-content-center mt-4">
                            <h2
                              className="sailec"
                              style={{ fontWeight: 700, fontSize: '32px', lineHeight: '40px', textAlign: 'center' }}>
                              Test de Ansiedad de Beck
                            </h2>
                          </div>
                          <div className="row">
                            <div className="col-12 col-md-10 ms-md-5">
                              <p>
                                En el cuestionario hay una lista de síntomas comunes de la ansiedad. Lea cada uno de los ítems atentamente, e indique cuanto le ha afectado en la última semana incluyendo hoy:
                              </p>
                              <p>0 = En absoluto</p>
                              <p>1 = Levemente</p>
                              <p>2 = Moderadamente</p>
                              <p>3 = Severamente</p>
                            </div>
                          </div>
                          </div>
                        </div>
                        {
                          preguntas.map((item, index) => (
                            <div
                              className="col-12 col-md-11"
                              key={index + item.label}
                              style={{
                                background: index % 2 === 0 && 'lightgrey'
                              }}
                            >
                              <div className="form-group select-gender d-flex justify-content-between" style={{ margin: 'auto', padding: '10px' }}>
                                <label className="col-6 col-md-9">
                                  {item.pregunta}
                                </label>
                                <div className="col-5 col-md-3 text-end" style={{ margin: 'auto 0' }}>
                                  <div className="form-check-inline me-1 me-md-3" >
                                    <label
                                      className="form-check-label"
                                      style={{ textAlign: 'center' }}
                                    >
                                      <input
                                        type="radio"
                                        name={item.label}
                                        value={0}
                                        className="form-check-input d-block me-0"
                                        {...register(item.label, {
                                          required: {
                                            value: true,
                                            message: 'Debes seleccionar una opción'
                                          }})}
                                      />
                                      0
                                    </label>
                                  </div>
                                  <div className="form-check-inline me-1 me-md-3" style={{ marginRight: '5px' }}>
                                    <label
                                      className="form-check-label"
                                      style={{ textAlign: 'center' }}>
                                      <input
                                        type="radio"
                                        name={item.label}
                                        value={1}
                                        className="form-check-input d-block me-0"
                                        {...register(item.label, {
                                          required: {
                                            value: true,
                                            message: 'Debes seleccionar una opción'
                                          }})}
                                      />
                                      1
                                    </label>
                                  </div>
                                  <div className="form-check-inline me-1 me-md-3" style={{ marginRight: '5px' }}>
                                    <label
                                      className="form-check-label"
                                      style={{ textAlign: 'center' }}>
                                      <input
                                        type="radio"
                                        name={item.label}
                                        value={2}
                                        className="form-check-input d-block me-0"
                                        {...register(item.label, {
                                          required: {
                                            value: true,
                                            message: 'Debes seleccionar una opción'
                                          }})}
                                      />
                                      2
                                    </label>
                                  </div>
                                  <div className="form-check-inline me-1 me-md-3" style={{ marginRight: '5px' }}>
                                    <label
                                      className="form-check-label"
                                      style={{ textAlign: 'center' }}>
                                      <input
                                        type="radio"
                                        name={item.label}
                                        value={3}
                                        className="form-check-input d-block me-0"
                                        {...register(item.label, {
                                          required: {
                                            value: true,
                                            message: 'Debes seleccionar una opción'
                                          }})}
                                      />
                                      3
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        }

                        <div className="col-12 mt-4">
                          <div className="doctor-submit text-end">
                            <button
                              type="button"
                              className="btn btn-primary submit-form me-2"
                              onClick={handleOpen}
                            >
                              Continuar
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary cancel-form"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                      </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10">
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                    Puedes ingresar tus datos y enviaremos los resultados a tu correo, o puedes continuar anónimamente.
                  </Typography>
                  <div className="col-12 ">
                    <div className="form-group local-forms">
                      <label>
                        Nombre <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        {...register('nombre', {
                          required: {
                            value: true,
                            message: 'Nombre es requerido'
                          }})}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group local-forms">
                      <label>
                        Apellido <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder=""
                        {...register('apellido', {
                          required: {
                            value: true,
                            message: 'Apellido es requerido'
                          }})}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group local-forms">
                      <label>
                        Email <span className="login-danger">*</span>
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        placeholder=""
                        {...register('email', {
                          required: {
                            value: true,
                            message: 'Correo electrónico es requerido'
                          }})}
                      />
                    </div>
                  </div>

                  <ChildModal result={determinarDescripcion(resultado)} />
                </Box>
              </Modal>
            </div>

          </div>
        </div>
      </div>

    </>
  )

}

export default TestAnsiedad;