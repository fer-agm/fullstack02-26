var data = [
    ["120","Ronald Villalobos","auto a control rémoto","2026/07/12","10990"],
    ["121","Carlos Abarzua","control rémoto para auto","2026/07/12","6500"],
    ["122","Juan Carlos De la Cruz","Lápiz 3D","2026/08/20","7990"],
    ["123","Orlando Sepúlveda","Suscripción Oracle","2026/07/12","100"],
    ["124","José Kast","Retrato presidencial","2024/03/10","9999999999999"],
    ["125","El Chino","Jurel","2026/07/23","100000000"],
    ["126","Quiróz","Pollo","2010/07/12","0"],
    ["128","Macarena Morgan","Reformer","2025/12/10","1299990"],
    ["129","Claudio Crespo","Escopeta","2019/10/18","0"],
    ["130","Particio Maturana","Bomba lacrimógena","2019/11/18","0"]
]

    function getDatosRegistrados() {
      const stored = localStorage.getItem('registro_compras');
      if (stored){
        try {
          return JSON.parse(stored);
        } catch (e) {
          return data;
        }
      }
      return data;
    }

    function saveDatosRegistrados(dataArray) {
      localStorage.setItem('registro_compras', JSON.stringify(dataArray));
    }


document.addEventListener('DOMContentLoaded', function () {
  let registrarData = getDatosRegistrados();

  const table = $('#tablaEstadisticas').DataTable({
    data: registrarData,
    columns: [
      { title: 'ID Compra' },
      { title: 'Nombre Cliente' },
      { title: 'Qué Compró' },  
      { title: 'Fecha de Compra' },
      { title: 'Valor Compra' }
    ],
    dom: 'Bfrtip',
        buttons:[
        {extend: 'excel', title: 'Registro de Compras'},
        {extend: 'pdf', title: 'Registro de Compras'},
        {extend: 'copy', title: 'Registro de Compras'}
        ],
    language: {
      url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-CL.json'
    }
});
    const form = document.getElementById('formulario');




  form.addEventListener('submit', function (event) {
    event.preventDefault(); 

    const idInput = document.getElementById('id');
    const nombreInput = document.getElementById('nombre');
    const compraInput = document.getElementById('compra');
    const fechaInput = document.getElementById('fecha');
    const valorInput = document.getElementById('valor');

    let esValido = true;
    let mensError = '';




    function validarCampo(campo, condicion, mensaje) {
      const helperText = campo.nextElementSibling;
      if (!condicion) {
        campo.classList.add('invalido');
        campo.classList.remove('valido');
        if (helperText) helperText.setAttribute('data-error', mensaje);
        if (!mensError) mensError = mensaje;
        esValido = false;
      } else {
        campo.classList.add('valido');
        campo.classList.remove('invalido');
        if (helperText) helperText.removeAttribute('data-error');
      }
    }

    validarCampo(
      idInput,
      idInput.value.trim() !== '',
      'El ID de compra es obligatorio.'
    );

    const nombreRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,}$/;
    validarCampo(
      nombreInput,
      nombreRegex.test(nombreInput.value.trim()),
      'Ingrese un nombre válido (solo letras, mínimo 3 caracteres).'
    );

    validarCampo(
      compraInput,
      compraInput.value.trim() !== '',
      'Debe ingresar los productos comprados.'
    );

    const selectedDate = new Date(fechaInput.value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);

    validarCampo(
      fechaInput,
      fechaInput.value !== '' && selectedDate <= today,
      'Ingrese una fecha válida (no puede ser futura).'
    );

    const valor = parseFloat(valorInput.value);
    validarCampo(
      valorInput,
      !isNaN(valor) && valor > 0,
      'El valor debe ser un número mayor a 0.'
    );

    if (esValido) {
      const nuevoRegistro = [
        idInput.value.trim(),
        nombreInput.value.trim(),
        compraInput.value.trim(),
        fechaInput.value,
        valorInput.value.trim()
      ];

      table.row.add(nuevoRegistro).draw(false);
      registrarData.push(nuevoRegistro);
      saveDatosRegistrados(registrarData);



      M.toast({
        html: '¡Registro agregado exitosamente!',
        classes: 'green lighten-1 rounded'
      });
      
      form.reset();
      document.querySelectorAll('.validate').forEach(input => {
        input.classList.remove('valido', 'invalido');
      });
    } else {
      M.toast({
        html: mensError,
        classes: 'red darken-1 rounded'
      });
    }
  });
});