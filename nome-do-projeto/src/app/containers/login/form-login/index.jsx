export default function FormLogin() {

    return (
        <form className="w-full max-w-[300px] sm:w-[300px] px-4 sm:px-0">
            <h3 className="text-[#E7E9EA] font-bold mb-4 text-xl sm:text-[31px]">
                Inscreva-se hoje
            </h3>

            <div>
                <button
                    type="button"
                    className="
                bg-[#1A8CD8] font-bold text-[#E7E9EA]
                w-full h-[40px] rounded-full my-4
                cursor-pointer hover:bg-[#1267a0]
                transition duration-200
              "
                >
                    Criar conta
                </button>
                <p className="text-[#71767b] text-xs sm:text-[11px]">
                    Ao se inscrever, você concorda com os Termos de Serviço e a Política de Privacidade, incluindo o Uso de Cookies.
                </p>
            </div>

            <div className="mt-12 sm:mt-[50px]">
                <h4 className="text-[17px] text-[#E7E9EA] font-bold mb-4">
                    Já tem uma conta?
                </h4>
                <button
                    type="button"
                    className="
                text-[#1A8CD8] font-bold text-[15px]
                w-full h-[40px] rounded-full border border-[#71767b]
                cursor-pointer
                hover:bg-[#E7E9EA] hover:text-black transition duration-200
              "
                >
                    Entrar
                </button>
            </div>
        </form>
    )
}