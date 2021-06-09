
<template>
<div class="newOrder">

  <div class="status-content">

    <span class="statusInit">Inicializando</span>
    <span class="statusProgress">En proceso</span>
    <span class="statusCancel">Cancelado</span>

    <p>En re-evaluación inicial</p>
    <p>Re-evaluado esperando confirmación</p>
    <p>Re-evaluado esperando confirmación</p>
    <p>Completando información de compra</p>
    <p>Comprado y en camino a dirección de origen</p>
    <p>Recibido en dirección de origen y en evaluación</p>
    <p>Listo para embarque</p>
    <p>En proceso de embarque</p>
    <p>Entregado correctamente</p>
    <p>Cancelado</p>

  </div>

  <div class="status-titulo text-title">

    <h1>Orden de compra #B56764-1</h1>

  </div>

  <div class="card-container" id="newBoat">

      <div class="step_container">

        <ul class="progressbar">

          <li id="li1" href="#" class="inprocess"><p>Datos del embarque</p></li>

          <li id="li2" class="disabled"><p>Agregar equipaje</p></li>

          <li id="li3" class="disabled"><p>Agregar órdenes</p></li>

          <li id="li4" class="disabled"><p>Embarcar</p></li>

        </ul>

      </div>

      <div class="form_container" >

        <div class="form-login text-title">

          <div>
            <h1>Datos del embarque</h1>
              <div class="form-group ">
                <label for="" class="float-left">Destino</label>
              <select class="form-control form-control-lg">
                <option disabled="disabled" value="">Selecciona</option>
                <option value="1">Miami</option>
              </select>
            </div>
            <div class="form-group">
              <label for="" class="float-left">Descripcion</label>

              <textarea class="form-control null" rows="3" cols="70"></textarea>
            </div>

            <div class="form-group">
              <label for="" class="float-left">Fecha de salida<i data-toggle="tooltip" data-placement="bottom" title="" class="far fa-question-circle"></i></label>
              <input type="date" aria-describedby="email" max="2100-12-31" class="form-control null">
            </div>

            <div class="form-group">
              <label for="" class="float-left">Fecha de llegada<i data-toggle="tooltip" data-placement="bottom" title="" class="far fa-question-circle"></i></label>
              <input type="date" aria-describedby="email" max="2100-12-31" class="form-control null">
            </div>



            <div class="text-right"><a href="#" class="btn btn-primary btn-lg btn-edit">Continuar</a></div

            >
          </div> <!---->

        </div> <!----> <!----> <!---->

      </div>

      <div class="form_container">

        <div class="form-login text-title">

          <div>

            <h1>Datos del equipaje</h1>

            <div class="form-group ">
              <label for="" class="float-left">Tipo de equipaje</label>
              <select class="form-control form-control-lg">
                <option disabled="disabled" value="">Selecciona</option>
                <option value="1">Maleta</option>
              </select>
            </div>

            <div class="form-group">
              <label for="" class="float-left">Descripcion</label>
              <textarea class="form-control null" rows="3" cols="70"></textarea>
            </div>

            <div class="form-group">
              <label for="" class="float-left">Peso<i data-toggle="tooltip" data-placement="bottom" title="" class="far fa-question-circle"></i></label>
              <input type="text" aria-describedby="email" class="form-control null">
            </div>

            <div class="text-right"><a href="#" class="btn btn-primary btn-lg btn-edit">Continuar</a></div>

          </div> <!---->

        </div> <!----> <!----> <!---->

      </div>

      <div class="form_container">

        <div class="suitCase-content">

          <div class="formContent">
            <div class="formTitle">
              <h1>Equipaje</h1>
            </div>

            <div class="formNew" data-toggle="modal" data-target="#modalSuitcase" >
              <b-button v-b-modal.formmodal class="btn-primary">
                <i class="fas fa-plus"></i>Añadir equipaje
              </b-button>
            </div>
          </div>

          <div class="form-login text-title formResume">

            <div class="vitrinaContainer">

              <div class="vitrina vitrinaSuitcase">

                <ul>

                  <li>

                    <div class="product productSuitcase">

                      <div class="productImage" href="">

                        <div class="overlayImage"></div>

                        <div class="imageContent">

                          <div class="flag">
                            <p class="tag">Alta</p>

                          </div>

                          <img src="https://www.remaxcompras.com/wp-content/uploads/2020/05/paquete.png" alt="">

                        </div>

                      </div>

                      <div class="product-content">

                        <div class="product-etiquetas-price">

                          <h3 class="productName">Laptop 15.6" 320-15 AMD A12 16GB 2TB Azul</h3>

                          <div class="price">

                            <span class="price-after">

                                <span class="bold">#B56764-1</span>

                            </span>

                          </div>

                        </div>

                        <div class="ctrls por clearfix">

                          <button class="btn btn-danger proDelete" type="button" >Quitar</button>

                        </div>

                      </div>

                    </div>

                  </li>

                </ul>

              </div>

            </div>

            <div class="emptyVitrina">
              <p>No has añadido equipaje</p>
            </div>

            <div class="text-right">

              <div class="weightContent">
                <span>10 kg</span>
              </div>

              <a href="#" class="btn btn-primary btn-lg btn-edit">Continuar</a>

            </div>

          </div>



        </div>

      </div>

      <div class="form-order">

        <div class="form_container form-flex">

            <div class="form-test text-title formResume">

            <div class="formContent">
              <div class="formTitle">
              <h1>Tus órdenes</h1>
            </div>


            </div>

              <div class="container-order">

                <div class="chooseOrder">

                  <div class="filter-search" id="icon-search">
                    <input id="search-bar" type="text" class="input form-control" placeholder="Buscar..." >
                  </div>

                  <div class="vitrinaContainer">

                    <div class="vitrina">

                      <ul>

                         <li>

                          <div class="product productOrder">

                            <div class="productImage" href="">

                              <div class="imageContent">

                                <div class="flag tag-alta">
                                  <p class="tag">Alta</p>
                                  <p class="tag">Medio</p>
                                </div>

                                <img src="https://www.remaxcompras.com/wp-content/uploads/2020/05/paquete.png" alt="">

                              </div>

                            </div>

                            <div class="product-content">

                              <div class="product-etiquetas-price">

                                <h3 class="productName">Laptop 15.6" 320-15 AMD A12 16GB 2TB Azul</h3>

                                <div class="price">

                                  <span class="price-after">

                                      <span class="bold">#B56764-1</span>

                                  </span>

                                </div>

                              </div>

                              <div class="ctrls por clearfix">

                                <div class="cantidad">

                                  <input class="num ctrl-num" type="tel" value="1" data-max="1">

                                  <div class="arrows">

                                      <div class="up ctrl-max disabled"></div>

                                      <div class="down ctrl-min"></div>

                                  </div>

                                </div>

                                <button class="btn btn-primary proAdd" type="button" ><i class="fas fa-plus"></i></button>

                                <button class="btn btn-danger proDelete" type="button" >Quitar</button>

                              </div>

                            </div>

                          </div>

                        </li>

                        <li>

                          <div class="product productOrder">

                            <div class="productImage" href="">

                              <div class="imageContent">

                                <div class="flag tag-alta">
                                  <p class="tag">Alta</p>
                                  <p class="tag">Medio</p>
                                </div>

                                <img src="https://www.remaxcompras.com/wp-content/uploads/2020/05/paquete.png" alt="">

                              </div>

                            </div>

                            <div class="product-content">

                              <div class="product-etiquetas-price">

                                <h3 class="productName">Laptop 15.6" 320-15 AMD A12 16GB 2TB Azul</h3>

                                <div class="price">

                                  <span class="price-after">

                                      <span class="bold">#B56764-1</span>

                                  </span>

                                </div>

                              </div>

                              <div class="ctrls por clearfix">

                                <div class="cantidad">

                                  <input class="num ctrl-num" type="tel" value="1" data-max="1">

                                  <div class="arrows">

                                      <div class="up ctrl-max disabled"></div>

                                      <div class="down ctrl-min"></div>

                                  </div>

                                </div>

                                <button class="btn btn-primary proAdd" type="button" ><i class="fas fa-plus"></i></button>

                                <button class="btn btn-danger proDelete" type="button" >Quitar</button>

                              </div>

                            </div>

                          </div>

                        </li>

                        <li>

                          <div class="product productOrder">

                            <div class="productImage" href="">

                              <div class="imageContent">

                                <div class="flag tag-alta">
                                  <p class="tag">Alta</p>
                                  <p class="tag">Medio</p>
                                </div>

                                <img src="https://www.remaxcompras.com/wp-content/uploads/2020/05/paquete.png" alt="">

                              </div>

                            </div>

                            <div class="product-content">

                              <div class="product-etiquetas-price">

                                <h3 class="productName">Laptop 15.6" 320-15 AMD A12 16GB 2TB Azul</h3>

                                <div class="price">

                                  <span class="price-after">

                                      <span class="bold">#B56764-1</span>

                                  </span>

                                </div>

                              </div>

                              <div class="ctrls por clearfix">

                                <div class="cantidad">

                                  <input class="num ctrl-num" type="tel" value="1" data-max="1">

                                  <div class="arrows">

                                      <div class="up ctrl-max disabled"></div>

                                      <div class="down ctrl-min"></div>

                                  </div>

                                </div>

                                <button class="btn btn-primary proAdd" type="button" ><i class="fas fa-plus"></i></button>

                                <button class="btn btn-danger proDelete" type="button" >Quitar</button>

                              </div>

                            </div>

                          </div>

                        </li>

                        <li>

                          <div class="product productOrder">

                            <div class="productImage" href="">

                              <div class="imageContent">

                                <div class="flag tag-alta">
                                  <p class="tag">Alta</p>
                                  <p class="tag">Medio</p>
                                </div>

                                <img src="https://www.remaxcompras.com/wp-content/uploads/2020/05/paquete.png" alt="">

                              </div>

                            </div>

                            <div class="product-content">

                              <div class="product-etiquetas-price">

                                <h3 class="productName">Laptop 15.6" 320-15 AMD A12 16GB 2TB Azul</h3>

                                <div class="price">

                                  <span class="price-after">

                                      <span class="bold">#B56764-1</span>

                                  </span>

                                </div>

                              </div>

                              <div class="ctrls por clearfix">

                                <div class="cantidad">

                                  <input class="num ctrl-num" type="tel" value="1" data-max="1">

                                  <div class="arrows">

                                      <div class="up ctrl-max disabled"></div>

                                      <div class="down ctrl-min"></div>

                                  </div>

                                </div>

                                <button class="btn btn-primary proAdd" type="button" ><i class="fas fa-plus"></i></button>

                                <button class="btn btn-danger proDelete" type="button" >Quitar</button>

                              </div>

                            </div>

                          </div>

                        </li>

                        <li>

                          <div class="product productOrder">

                            <div class="productImage" href="">

                              <div class="imageContent">

                                <div class="flag tag-alta">
                                  <p class="tag">Alta</p>
                                  <p class="tag">Medio</p>
                                </div>

                                <img src="https://www.remaxcompras.com/wp-content/uploads/2020/05/paquete.png" alt="">

                              </div>

                            </div>

                            <div class="product-content">

                              <div class="product-etiquetas-price">

                                <h3 class="productName">Laptop 15.6" 320-15 AMD A12 16GB 2TB Azul</h3>

                                <div class="price">

                                  <span class="price-after">

                                      <span class="bold">#B56764-1</span>

                                  </span>

                                </div>

                              </div>

                              <div class="ctrls por clearfix">

                                <div class="cantidad">

                                  <input class="num ctrl-num" type="tel" value="1" data-max="1">

                                  <div class="arrows">

                                      <div class="up ctrl-max disabled"></div>

                                      <div class="down ctrl-min"></div>

                                  </div>

                                </div>

                                <button class="btn btn-primary proAdd" type="button" ><i class="fas fa-plus"></i></button>

                                <button class="btn btn-danger proDelete" type="button" >Quitar</button>

                              </div>

                            </div>

                          </div>

                        </li>

                      </ul>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div class="form-test text-title formResume">

              <div class="formContent">

                <div class="formTitle">
                  <h1>Tu embarque</h1>
                </div>

                <div class="formNew" data-toggle="modal" data-target="#modalSuitcase" >

                  <div class="weightContent">
                    <span>10 kg</span>
                  </div>

                  <b-button v-b-modal.formmodal class="btn-primary">Guardar</b-button>

                </div>

              </div>

              <div class="container-order">

                <div class="resumeOrder">

                  <div class="filter-search" id="icon-search">
                    <input id="search-bar" type="text" class="input form-control" placeholder="Buscar..." >
                  </div>

                  <div class="vitrinaContainer">

                    <div class="vitrina">

                    <ul>

                      <li>

                        <div class="product productChoose">

                          <div class="productImage" href="">

                            <div class="imageContent">

                              <img src="https://www.remaxcompras.com/wp-content/uploads/2020/05/paquete.png" alt="">

                            </div>

                          </div>

                          <div class="product-content">

                            <div class="product-etiquetas-price">

                              <h3 class="productName">Laptop 15.6" 320-15 AMD A12 16GB 2TB Azul</h3>

                              <div class="price">

                                <span class="price-after">

                                    <span class="bold">#B56764-1</span>

                                </span>

                              </div>

                            </div>

                            <div class="ctrls por clearfix">

                              <div class="cantidad">

                                <input class="num ctrl-num" type="tel" value="1" data-max="1">

                                <div class="arrows">

                                    <div class="up ctrl-max disabled"></div>

                                    <div class="down ctrl-min"></div>

                                </div>

                              </div>

                              <button class="btn btn-danger proAdd " type="button" ><i class="fas fa-times"></i></button>

                            </div>

                          </div>

                        </div>

                      </li>

                    </ul>

                  </div>

                  </div>

                </div>

              </div>
            </div>

        </div>

      </div>

      <div class="form_container">

        <div class="suitCase-content">

          <div class="formContent">
            <div class="formTitle">
              <h1>Resumen del embarque</h1>
            </div>
          </div>

          <div class="form-login text-title formResume">

            <div class="vitrinaContainer">

              <div class="vitrina vitrinaSuitcase">

                <ul>

                  <li>

                    <div class="product productChoose">

                      <div class="productImage" href="">

                        <div class="overlayImage"></div>

                        <div class="imageContent">

                          <div class="flag">
                            <p class="tag">Alta</p>

                          </div>

                          <img src="https://www.remaxcompras.com/wp-content/uploads/2020/05/paquete.png" alt="">

                        </div>

                      </div>

                      <div class="product-content">

                        <div class="product-etiquetas-price">

                          <h3 class="productName">Laptop 15.6" 320-15 AMD A12 16GB 2TB Azul</h3>

                          <div class="price">

                            <span class="price-after">

                                <span class="bold">#B56764-1</span>

                            </span>

                          </div>

                        </div>

                        <div class="ctrls por clearfix">

                          <div class="cantidad">

                            <input class="num ctrl-num" type="tel" value="1" data-max="1">

                            <div class="arrows">

                                <div class="up ctrl-max disabled"></div>

                                <div class="down ctrl-min"></div>

                            </div>

                          </div>

                          <button class="btn btn-danger proAdd" type="button" ><i class="fas fa-times"></i></button>

                        </div>

                      </div>

                    </div>

                  </li>

                </ul>

              </div>

            </div>

            <div class="text-right">

              <div class="weightContent">
                <span>10 kg</span>
              </div>

              <a href="#" class="btn btn-primary btn-lg btn-edit">Continuar</a>

            </div>

          </div>



        </div>

      </div>

  </div>

  <div class="card-container" id="newTracking">

    <div class="card card-correct">

      <div class="card-header collapsed " id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Comprado y en camino a dirección de origen</h1>
            </li>
          </ul>
        </div>

      </div>

      <div class="text-right">
        <a href="#" data-toggle="modal" data-target="#modalNewTracking" class="btn btn-primary btn-lg">Evaluar</a>
      </div>

      <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Datos del cliente</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="card card-correct">

      <div class="card-header collapsed " id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Recibido y completando datos de recpeción</h1>
            </li>
          </ul>

        </div>

      </div>

      <div class="text-right">
        <a href="#" data-toggle="modal" data-target="#modalNewTracking" class="btn btn-primary btn-lg">Re-evaluar</a>
        <a href="#" class="btn btn-primary btn-lg">Procesar</a>
      </div>

      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Datos del cliente</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="card card-correct">

      <div class="card-header collapsed " id="headinThree" data-toggle="collapse" data-target="#collapsenThree" aria-expanded="true" aria-controls="collapseFour">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Listo para embarcar</h1>
            </li>
          </ul>



        </div>

      </div>

      <div id="collapsenThree" class="collapse" aria-labelledby="headingnThree" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Listo para embarque</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

  <div class="card-container" id="newTracking-SameStore">

    <div class="card card-warning">

      <div class="card-header collapsed " id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Oferta de compra demorada</h1>
              <h2>Oferta de compra demorada</h2>
            </li>
          </ul>
        </div>

      </div>

      <div class="text-right">
        <a href="#" data-toggle="modal" data-target="#modalNewTracking" class="btn btn-primary btn-lg">Evaluar</a>
        <a href="#" data-toggle="modal" data-target="#modalTypeReplacement" class="btn btn-primary btn-lg">Generar incidencia</a>
      </div>

      <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Datos del cliente</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="card card-cancel">

      <div class="card-header collapsed " id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Cancelado por incidencia</h1>
            </li>
          </ul>

        </div>

      </div>

      <div class="text-right">
        <a href="#" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalReplacement">Generar reemplazo</a>

      </div>

      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Datos del cliente</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="card card-cancel">

      <div class="card-header collapsed " id="headinThree" data-toggle="collapse" data-target="#collapsenThree" aria-expanded="true" aria-controls="collapseFour">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Orden cancelada por reemplazo, ver <span>nueva orden aqui</span></h1>
            </li>
          </ul>



        </div>

      </div>

      <div id="collapsenThree" class="collapse" aria-labelledby="headingnThree" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Listo para embarque</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

  <div class="card-container" id="newTracking-OtherStore">

    <div class="card card-warning">

      <div class="card-header collapsed " id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Oferta de compra demorada</h1>
              <h2>Oferta de compra demorada</h2>
            </li>
          </ul>
        </div>

      </div>

      <div class="text-right">
        <a href="#" data-toggle="modal" data-target="#modalNewTracking" class="btn btn-primary btn-lg">Evaluar</a>
        <a href="#" data-toggle="modal" data-target="#modalTypeReplacement" class="btn btn-primary btn-lg">Generar incidencia</a>
      </div>

      <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Datos del cliente</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="card card-cancel">

      <div class="card-header collapsed " id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Cancelado por incidencia</h1>
            </li>
          </ul>

        </div>

      </div>

      <div class="text-right">
        <a href="#" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalRefund">Informacion de reembolso</a>
        <a href="/tasks" class="btn btn-primary btn-lg">Generar reemplazo</a>
      </div>

      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Datos del cliente</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="card card-cancel">

      <div class="card-header collapsed " id="headinThree" data-toggle="collapse" data-target="#collapsenThree" aria-expanded="true" aria-controls="collapseFour">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Orden cancelada por reemplazo, ver <span>nueva orden aqui</span></h1>
            </li>
          </ul>



        </div>

      </div>

      <div id="collapsenThree" class="collapse" aria-labelledby="headingnThree" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Listo para embarque</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

  <div class="card-container" id="testOrder">

    <div class="card card-standby">

      <div class="card-header collapsed " id="headingOne" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Oferta por evaluar</h1>
            </li>
          </ul>
        </div>

      </div>

      <div class="text-right">
        <a href="#" data-toggle="modal" data-target="#modalTest" class="btn btn-primary btn-lg">Evaluar</a>
      </div>

    </div>

    <div class="card card-cancel">

      <div class="card-header collapsed " id="headingTwo" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Oferta no aprobada</h1>
            </li>
          </ul>

        </div>

      </div>

      <div class="text-right">
        <a href="#" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalTest">Re-evaluar</a>
        <a href="#" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalExtraInfo">Procesar</a>
      </div>

      <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Datos del cliente</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="card card-correct">

      <div class="card-header collapsed " id="headinThree" data-toggle="collapse" data-target="#collapsenThree" aria-expanded="true" aria-controls="collapseFour">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Oferta aprobada</h1>
            </li>
          </ul>

        </div>

      </div>

      <div class="text-right">
        <a href="#" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalTest">Re-evaluar</a>
        <a href="#" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalExtraInfo">Procesar</a>
      </div>

      <div id="collapsenThree" class="collapse" aria-labelledby="headingnThree" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Listo para embarque</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="card card-standby card-wait">

      <div class="card-header collapsed " id="headinFive" data-toggle="collapse" data-target="#collapsenFive" aria-expanded="true" aria-controls="collapseFive">

        <div class="card-content">
          <ul>
            <li>
              <p></p>
            </li>
            <li>
              <h1>Esperando revision del administrador</h1>
            </li>
          </ul>

        </div>

      </div>

      <div class="text-right">
        <a href="#" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalTest">Re-evaluar</a>
        <a href="#" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modalExtraInfo">Procesar</a>
      </div>

      <div id="collapsenFive" class="collapse" aria-labelledby="headingnFive" data-parent="#accordion">

        <div class="card-body">

          <div class="form-login text-title">

            <div class="container-type">

              <div class="resumen-type">

                <div class="resumen-top">
                  <h1>Listo para embarque</h1>
                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

  <div class="card-container" id="user">

    <div class="form_container">

      <div class="purchaseOrders">

        <div class="formContent">

          <div class="formTitle">
            <h1>Lista de usuarios</h1>
          </div>

          <div class="formNew" data-toggle="modal" data-target="#modalNewUser" v-if="$store.state.user.attributes.permissions_keys.includes(8)">
            <b-button v-b-modal.formmodal class="btn-primary">
              <i class="fas fa-plus"></i>Crear nuevo usuario
            </b-button>
          </div>

        </div>

        <div class="tableFilters" id="icon-search">

          <div class="filter-search">
            <input id="search-bar" type="text" class="input form-control">
          </div>

          <div class="filter-status">
            <select class="form-control form-filter">
              <option value="10">Administrador</option>
              <option value="20">Operador de envío</option>
              <option value="30">Operador de recepcion</option>
            </select>
          </div>

        </div>

        <table class="table table-edit is-bordered data-table">

          <thead>

            <tr>
              <th>Nombre del usuario</th>
              <th>Tipo</th>
              <th>Fecha de creacion</th>
              <th>Ultima actualizacion</th>
              <th>Accion</th>
            </tr>

          </thead>

          <tbody>

            <tr>

              <td>Jose Catillo</td>
              <td>Administrador</td>
              <td>22/34/2019</td>
              <td>22/34/2019</td>

              <td>

                <div class="dropdown show">

                  <button type="button" class="btn-icon btn-icon-only btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button>

                  <button type="button" data-toggle="modal" data-target="#modalEditUser" class="btn-icon btn-icon-only btn btn-warning btn-sm"><i class="fas fa-edit"></i></button>

                </div>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

    <div class="form_container">

        <div class="user-container">

          <div class="userContent">

            <div class="userCard">
              <div class="author">
                  <img class="avatar border-gray" src="https://demos.creative-tim.com/now-ui-dashboard/assets/img/mike.jpg" alt="...">
                      <h5 class="title">Jose Castillo</h5>
                  <p class="description">
                      Administrador
                  </p>
              </div>

              <div class="user-details">

                <div class="row-details">

                  <div class="blockDetails">
                    <span>ID o DNI</span>
                    <span>98768954</span>
                  </div>

                  <div class="blockDetails">
                    <span>Telefono</span>
                    <span>+51 921 276 643</span>
                  </div>

                </div>

                <div class="row-details">

                  <div class="blockDetails">
                    <span>Correo</span>
                    <span>erick.22@gmail.com</span>
                  </div>

                  <div class="blockDetails">
                    <span>Tipo</span>
                    <span>Administrador</span>
                  </div>

                </div>



              </div>

            </div>

          </div>

          <div class="form_container userForm">

            <div class="form-login">

              <div class="formContent">

                <div class="formTitle">

                  <h1>Datos de usuario</h1>

                </div>

              </div>

              <div class="formItem">

                <div class="form-group">
                  <label for="" class="float-left">Nombre<i data-toggle="tooltip" data-placement="bottom" title="" class="far fa-question-circle" ></i></label>
                  <input type="text" aria-describedby="email" class="form-control null" placeholder="Jose Castillo">
                </div>

                <div class="form-group">
                  <label for="" class="float-left">Correo electronico<i data-toggle="tooltip" data-placement="bottom" title="" class="far fa-question-circle"></i></label>
                  <input type="text" aria-describedby="email" class="form-control null" placeholder="josecastillo@gmail.com">
                </div>

                <div class="form-group">
                  <label for="" class="float-left">ID o DNI<i data-toggle="tooltip" data-placement="bottom" title="" class="far fa-question-circle"></i></label>
                  <input type="text" aria-describedby="email" class="form-control null" placeholder="45678908">
                </div>

                <div class="form-group">
                  <label for="" class="float-left">Pais<i data-toggle="tooltip" data-placement="bottom" title="" class="far fa-question-circle"></i></label>
                  <input type="text" aria-describedby="email" class="form-control null" placeholder="Peru">
                </div>

                <div class="form-group">
                  <label for="" class="float-left">Zip code<i data-toggle="tooltip" data-placement="bottom" title="" class="far fa-question-circle"></i></label>
                  <input type="text" aria-describedby="email" class="form-control null" placeholder="5566">
                </div>

                <div class="text-right"><a href="#" class="btn btn-primary btn-lg btn-edit">Guardar</a></div>

              </div>

            </div>

          </div>

        </div>

    </div>

  </div>

  <div class="details-content">

    <div class="details-image">
      <div class="image-order"></div>
    </div>

    <div class="details-title text-title">
      <h1>Apple iPhone 7 Plus Factory desbloqueado CDMA/GSM teléfono inteligente</h1>
      <p>Oferta genera de<span class="order-type">Grabr</span></p>
      <p>Cantidad<span class="order-cant">1</span></p>
    </div>

  </div>

  <div class="orden-subtitulo text-title">
    <h1>Detalles de la orden</h1>
  </div>

  <div class="details-tab">

    <div id="accordion">

      <div class="card">

        <div class="card-header collapsed" id="headingSeven" data-toggle="collapse" data-target="#collapseseven" aria-expanded="false" aria-controls="collapseSeven">
          <div class="details-text">
            <h1><i class="fa" aria-hidden="true"></i></h1>
            <p>Datos de reembolso</p>
          </div>
        </div>

        <div id="collapseSeven" class="collapse" aria-labelledby="headingSeven" data-parent="#accordion">
          <div class="card-body">

            <div class="form-login text-title">

              <div class="resumen-type">

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div class="card">

        <div class="card-header collapsed" id="headingFour" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">

          <div class="details-text">
            <h1><i class="fa" aria-hidden="true"></i></h1>
            <p>Datos del cliente</p>
          </div>

        </div>

        <div id="collapseFour" class="collapse show" aria-labelledby="headingFour" data-parent="#accordion">

          <div class="card-body">

            <div class="form-login text-title">

              <div class="resumen-type">

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div class="card">

        <div class="card-header collapsed" id="headingFive" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          <div class="details-text">
            <h1><i class="fa" aria-hidden="true"></i></h1>
            <p>Datos del artículo</p>
          </div>
        </div>

        <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordion">

          <div class="card-body">

            <div class="form-login text-title">

              <div class="resumen-type">

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      <div class="card">

        <div class="card-header collapsed" id="headingSix" data-toggle="collapse" data-target="#collapseSix" aria-expanded="false" aria-controls="collapseSix">
          <div class="details-text">
            <h1><i class="fa" aria-hidden="true"></i>
            </h1>
            <p>Datos de compra</p>
          </div>
        </div>

        <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordion">

          <div class="card-body">

            <div class="form-login text-title">

              <div class="resumen-type">

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

                <div class="resumen_orden">

                  <div class="resumen_titulo">
                    <h1>Nombre</h1>
                  </div>

                  <div class="resumen_content">
                    <h1>Robert</h1>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

  <div class="orden-subtitulo text-title">
    <h1>Historial Comentarios</h1>
  </div>

  <div class="comentarios-buttom">

    <div class="form-login text-title">

      <div class="form-group">
        <label for class="float-left">Escribe tu comentari<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
        <input type="text" id="Nombre" aria-describedby="email" class="form-control null">
      </div>

      <div class="text-right">
        <a href="#" class="btn btn-primary btn-lg btn-edit">Continuar</a>
      </div>

      <div class="text-title comments-subtitle">
        <h1>Ultimos comentarios</h1>
      </div>

      <div class="comments-block">

        <ul class="comments-list">

          <li class="comments-group">

            <div class="comments-item">

              <div class="comments-icon">
                <i class="fas fa-comment-alt"></i>
              </div>

              <div class="comments-message">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                  consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                  proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <span class="comments-message">Raquel Leaño 26/2/2019 16:20</span>
              </div>

            </div>

          </li>

        </ul>

      </div>

    </div>

  </div>

  <div class="modal fade" id="modalNewTracking" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">

      <div class="modal-content">

        <div class="modal-header">

          <h5 class="modal-title" id="exampleModalLongTitle">Estado de la orden</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

        </div>

        <div class="modal-body">

          <div class="form-login text-title">

            <div class="form-group">
              <label for class="float-left">Fecha real de llegada<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Peso de la orden<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Numero de la orden<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1">
              <label class="form-check-label" for="exampleCheck1">Usar el nro de tracking original: <span>34TGBH56</span></label>
            </div>

          </div>

        </div>

        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Guardar</button>
        </div>

      </div>

    </div>

  </div>

  <div class="modal fade" id="modalTypeReplacement" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">

      <div class="modal-content">

        <div class="modal-header">

          <h5 class="modal-title" id="exampleModalLongTitle">Selecciona el tipo de incidencia</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

        </div>

        <div class="modal-body">

          <div class="form-login text-title">

            <div class="form-group">

              <select class="form-control form-control-lg">
                <option selected value="1">Misma tienda</option>
                <option value="2">Otra tienda</option>
              </select>

            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">Descripcion</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>

          </div>

        </div>

        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Continuar</button>
        </div>

      </div>

    </div>

  </div>

  <div class="modal fade" id="modalReplacement" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">

      <div class="modal-content">

        <div class="modal-header">

          <h5 class="modal-title" id="exampleModalLongTitle">Datos de reemplazo</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

        </div>

        <div class="modal-body">

          <div class="form-login text-title">

            <div class="form-group">
              <label for class="float-left">Numero de orden<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Numero de tracking<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Link de compra<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Fecha de salida aproximada<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Fecha de entrada aproximada<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

          </div>

        </div>

        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Continuar</button>
        </div>

      </div>

    </div>

  </div>

  <div class="modal fade" id="modalRefund" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">

      <div class="modal-content">

        <div class="modal-header">

          <h5 class="modal-title" id="exampleModalLongTitle">Datos de reembolso</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

        </div>

        <div class="modal-body">

          <div class="form-login text-title">

            <div class="form-group">
              <label for class="float-left">Monto<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Fecha de reembolso<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

          </div>

        </div>

        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Guardar</button>
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Guardar</button>
        </div>

      </div>

    </div>

  </div>

  <div class="modal fade" id="modalTest" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">

      <div class="modal-content">

        <div class="modal-header">

          <h5 class="modal-title" id="exampleModalLongTitle">Evaluación de la orden de compra</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

        </div>

        <div class="modal-body">

          <div class="form-login">

            <ul class="nav nav-pills nav-fill" id="myTab" role="tablist">

              <li class="nav-item"><a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Datos de Grabr</a></li>

              <li class="nav-item"><a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Datos reales</a></li>

            </ul>

            <div class="tab-content" id="myTabContent">

              <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

                <div class="form-group">
                  <label for class="float-left">Precio<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
                  <input type="text" id="email" aria-describedby="email" class="form-control null">
                </div>

                <div class="form-group">
                  <label for class="float-left">Impuestos<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
                  <input type="text" id="email" aria-describedby="email" class="form-control null">
                </div>

                <div class="form-group">
                  <label for class="float-left">Costo de envío<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
                  <input type="text" id="email" aria-describedby="email" class="form-control null">
                </div>

                <div class="form-group">
                  <label for class="float-left">Peso<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
                  <input type="text" id="email" aria-describedby="email" class="form-control null">
                </div>

              </div>

              <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                <div class="form-group">
                  <label for class="float-left">Precio<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
                  <input type="text" id="email" aria-describedby="email" class="form-control null">
                </div>

                <div class="form-group">
                  <label for class="float-left">Impuestos<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
                  <input type="text" id="email" aria-describedby="email" class="form-control null">
                </div>

                <div class="form-group">
                  <label for class="float-left">Costos de envío<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
                  <input type="text" id="email" aria-describedby="email" class="form-control null">
                </div>

                <div class="form-group">
                  <label for class="float-left">Telefono<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
                  <input type="text" id="email" aria-describedby="email" class="form-control null">
                </div>

              </div>

            </div>

          </div>

        </div>

        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Guardar</button>
        </div>

      </div>

    </div>

  </div>

  <div class="modal fade" id="modalExtraInfo" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">

      <div class="modal-content">

        <div class="modal-header">

          <h5 class="modal-title" id="exampleModalLongTitle">Datos de compra de adicional</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

        </div>

        <div class="modal-body">

          <div class="form-login" id="infoextra">

            <div class="form-group">
              <label for class="float-left">Link de compra (Final)<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Codigo de compra (Final)<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Nro.de tracking<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Fecha de envío esperada (Final)<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

          </div>

          <div class="form-login" id="selectOperator">

            <div class="form-group">

              <select class="form-control form-control-lg">
                <option selected value="1">Jose Perez</option>
                <option value="2">Luis Rodriguez</option>
              </select>

            </div>

          </div>

        </div>

        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Guardar</button>
        </div>

      </div>

    </div>

  </div>

  <div class="modal fade" id="modalSuitcase" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">

      <div class="modal-content">

        <div class="modal-header">

          <h5 class="modal-title" id="exampleModalLongTitle">Datos de equipaje</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

        </div>

        <div class="modal-body">

          <div class="form-login text-title">

            <div class="form-group ">
              <label for="" class="float-left">Tipo de equipaje</label>
              <select class="form-control form-control-lg">
                <option disabled="disabled" value="">Selecciona</option>
                <option value="1">Maleta</option>
              </select>
            </div>

            <div class="form-group">
              <label for class="float-left">Peso<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Descripcion<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <textarea class="form-control null" rows="3" cols="70"></textarea>
            </div>

          </div>

        </div>

        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Continuar</button>
        </div>

      </div>

    </div>

  </div>

  <div class="modal fade" id="modalEditUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">

      <div class="modal-content">

        <div class="modal-header">

          <h5 class="modal-title" id="exampleModalLongTitle">Datos de usuario</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

        </div>

        <div class="modal-body">

          <div class="form-login text-title">

            <div class="form-group">
              <label for class="float-left">Nombre<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Correo electronico<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Contraseña<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

            <div class="form-group">
              <label for class="float-left">Contraseña<i class="far fa-question-circle" data-toggle="tooltip" data-placement="bottom" title="Tooltip"></i></label>
              <input type="text" id="email" aria-describedby="email" class="form-control null">
            </div>

          </div>

        </div>

        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Guardar</button>
        </div>

      </div>

    </div>

  </div>

  <div class="modal fade" id="modalNewUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered" role="document">

      <div class="modal-content">

        <div class="modal-header">

          <h5 class="modal-title" id="exampleModalLongTitle">Datos de usuario</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>

        </div>

        <div class="modal-body">

          <div class="form-login text-title">

            <div class="form-group ">
              <label for="" class="float-left">Tipo de Usuario</label>
              <select class="form-control form-control-lg">
                <option disabled="disabled" value="">Administrador</option>
                <option value="1">Operador</option>
                <option value="1">Cliente</option>
              </select>
            </div>

          </div>

        </div>

        <div class="modal-footer text-right">
          <button type="button" class="btn btn-primary btn-lg" data-dismiss="modal">Guardar</button>
        </div>

      </div>

    </div>

  </div>

</div>

</template>










