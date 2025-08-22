-- CreateTable
CREATE TABLE "public"."pessoa" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(30) NOT NULL,

    CONSTRAINT "pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."telefone" (
    "id" SERIAL NOT NULL,
    "numero" VARCHAR(11) NOT NULL,
    "pessoaId" INTEGER NOT NULL,

    CONSTRAINT "telefone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."carro" (
    "id" SERIAL NOT NULL,
    "modelo" VARCHAR(20) NOT NULL,

    CONSTRAINT "carro_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pessoa_por_carro" (
    "pessoaId" INTEGER NOT NULL,
    "carroId" INTEGER NOT NULL,

    CONSTRAINT "pessoa_por_carro_pkey" PRIMARY KEY ("pessoaId","carroId")
);

-- AddForeignKey
ALTER TABLE "public"."telefone" ADD CONSTRAINT "telefone_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "public"."pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pessoa_por_carro" ADD CONSTRAINT "pessoa_por_carro_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "public"."pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pessoa_por_carro" ADD CONSTRAINT "pessoa_por_carro_carroId_fkey" FOREIGN KEY ("carroId") REFERENCES "public"."carro"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
