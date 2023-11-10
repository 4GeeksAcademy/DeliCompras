"""empty message

Revision ID: 631e13e328d2
Revises: 63d6d1920f04
Create Date: 2023-11-08 05:18:20.615636

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '631e13e328d2'
down_revision = '63d6d1920f04'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('categorias', schema=None) as batch_op:
        batch_op.alter_column('url',
               existing_type=sa.VARCHAR(length=160),
               type_=sa.String(length=320),
               existing_nullable=True)
        batch_op.alter_column('idu',
               existing_type=sa.VARCHAR(length=160),
               type_=sa.String(length=320),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('categorias', schema=None) as batch_op:
        batch_op.alter_column('idu',
               existing_type=sa.String(length=320),
               type_=sa.VARCHAR(length=160),
               existing_nullable=True)
        batch_op.alter_column('url',
               existing_type=sa.String(length=320),
               type_=sa.VARCHAR(length=160),
               existing_nullable=True)

    # ### end Alembic commands ###