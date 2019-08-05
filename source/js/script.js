$(document).ready(function () {

    let year = $("#year"),
        email = $("#email"),
        password = $("#password"),
        postalCode = $("#postalCode");

    addAndRemoveClasses = (i, add, remove) => {
        i.addClass(add);
        i.removeClass(remove);
    };

    validationPerOneAction = (i, value) => {
        if (value) {
            addAndRemoveClasses(i, "error", "valid");
            i.parent().find(".error-msg").addClass("active__error-msg");
        } else {
            addAndRemoveClasses(i, "valid", "error");
        }
    };

    //check inputs are empty or valid
    email.on("blur", function () {
        let $this = $(this);
        if ($this.val().length === 0) {
            addAndRemoveClasses($this, "error", "valid");
            $this.parent().find(".error-msg--empty").addClass("active__error-msg");
        } else if (!($this.val().indexOf("@") > -1)) {
            addAndRemoveClasses($this, "error", "valid");
            $this.parent().find(".error-msg--wrong").addClass("active__error-msg");
        } else {
            addAndRemoveClasses($this, "valid", "error");
        }
    });

    password.on("blur", function () {
        let $this = $(this);
        validationPerOneAction($this, ($this.val().length === 0));
    });

    year.on("blur", function () {
        let $this = $(this);
        validationPerOneAction($this, ($this.val() > 2001));
    });

    postalCode.on("keyup", function () {
        let $this = $(this);
        for (i = 0; i < $this.val().length; i++) {

            $this.parent().find(".error-msg--wrong-few").removeClass("active__error-msg");
            $this.parent().find(".error-msg--wrong-lot").removeClass("active__error-msg");

            addAndRemoveClasses($this, "error", "valid");

            if (($this.val().length < 5) && ($this.val().length !== 0)) {
                $this.parent().find(".error-msg--wrong-few").addClass("active__error-msg");
            } else if ($this.val().length > 30) {
                $this.parent().find(".error-msg--wrong-lot").addClass("active__error-msg");
            } else {
                addAndRemoveClasses($this, "valid", "error");
            }
        }
    });
    postalCode.on("blur", function () {
        let $this = $(this);
        $this.parent().find(".error-msg--wrong-few").removeClass("active__error-msg");
        $this.parent().find(".error-msg--wrong-lot").removeClass("active__error-msg");
        if ($this.val().length === 0) {
            addAndRemoveClasses($this, "error", "valid");
            $this.parent().find(".error-msg--empty").addClass("active__error-msg");
        } else {
            addAndRemoveClasses($this, "valid", "error");
        }
    });

    //clear inputs on focus
    $(".form__item-input").on("focus", function () {
        let $this = $(this);
        if ($this.hasClass("error")) {
            $(this).val("");
            $this.parent().find(".error-msg").removeClass("active__error-msg");
        }
    });

    //clear select on focus
    $(".form__item-select").on("focus", function () {
        let $this = $(this);
        if ($this.hasClass("error")) {
            $(this).val();
            $this.parent().find(".error-msg").removeClass("active__error-msg");
        }
    });

    // btn question active
    $(".form__info-btn").click(function (event) {
        let $this = $(this);
        event.preventDefault();
        $this.parent().find(".form__btn-info").toggleClass("active__btn-info");
    });
    $(".form__info-btn").on("mouseover", function () {
        let $this = $(this);
        let active = $this.parent().find(".form__btn-info").hasClass("active__btn-info");
        if (active !== true) {
            $this.parent().find(".form__btn-info").addClass("active__btn-info");
        }
    });
    $(".form__info-btn").on("mouseout", function () {
        let $this = $(this);
        let noactive = $this.parent().find(".form__btn-info").hasClass("active__btn-info");
        if (noactive === true) {
            $this.parent().find(".form__btn-info").removeClass("active__btn-info");
        }
    });

    $("#registerForm").submit(function(e) {

        e.preventDefault();

        $(".form__block input, select").removeClass("error");
        $(".form__block input, select").removeClass("valid");

        validateFields = () => {
            let validateYear = true;
            let validateEmail = true;
            let validatePassword = true;
            let validatePostalCode = true;

            smallFunctionForValidateFields = (i, findClass) => {
                $(i).addClass("error");
                $(i).parent().find(findClass).addClass("active__error-msg");
            };

            if (year.val() > 2001) {
                smallFunctionForValidateFields("#year", ".error-msg");
                validateYear = false;
            }

            if (email.val().length === 0) {
                smallFunctionForValidateFields("#email", ".error-msg--empty");
                validateEmail = false;
            } else if (!(email.val().indexOf("@") > -1)) {
                smallFunctionForValidateFields("#email", ".error-msg--wrong");
                validateEmail = false;
            }

            if (password.val().length === 0) {
                smallFunctionForValidateFields("#password", ".error-msg");
                validatePassword = false;
            }

            if (postalCode.val().length === 0) {
                smallFunctionForValidateFields("#postalCode", ".error-msg--empty");
                validatePostalCode = false;
            } else if ((postalCode.val().length < 5) && (postalCode.val().length !== 0)) {
                smallFunctionForValidateFields("#postalCode", ".error-msg--wrong-few");
                validateEmail = false;
            } else if (postalCode.val().length > 30) {
                smallFunctionForValidateFields("#postalCode", ".error-msg--wrong-lot");
                validateEmail = false;
            }

            if (validateYear && validateEmail && validatePassword && validatePostalCode) {
                return true;
            }
        };

        if (validateFields()) {
            console.log("Form is valid!");
            year.val("2019");
            email.val("");
            password.val("");
            postalCode.val("");
        } else {
            console.log('Validation form error!');
        }

    });
});