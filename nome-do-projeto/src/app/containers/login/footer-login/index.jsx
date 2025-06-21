import React from 'react';

export default function FooterLogin() {
    return (
        <footer className="w-full  text-[#71767b] py-4 fixed bottom-0 left-0 right-0 z-50">
            <div className="flex  flex-wrap justify-center items-center text-sm whitespace-nowrap overflow-x-auto px-2">
                {[
                    'Sobre',
                    'Baixe o aplicativo do X',
                    'Grok',
                    'Central de Ajuda',
                    'Termos de Serviço',
                    'Política de Privacidade',
                    'Política de cookies',
                    'MsTV Transparenzangaben',
                    'Imprint',
                    'Acessibilidade',
                    'Informações de anúncios',
                    'Blog',
                    'Carreiras',
                    'Recursos da marca',
                    'Publicidade',
                    'Marketing',
                    'X para Empresas',
                    'Desenvolvedores',
                    'Diretório',
                    'Configurações',
                ].map((item, index, array) => (
                    <React.Fragment key={item}>
                        <a href="#" className="hover:underline px-1 text-[11px]">
                            {item}
                        </a>
                        {index < array.length - 1 && <span className="px-1">|</span>}
                    </React.Fragment>
                ))}
                <span className="px-2 text-[11px]">© {new Date().getFullYear()} X Corp.</span>
            </div>
        </footer>
    )
}