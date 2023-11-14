"""empty message

Revision ID: df810a003c6b
Revises: 59d64d97bf91
Create Date: 2023-11-14 02:49:31.914438

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'df810a003c6b'
down_revision = '59d64d97bf91'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('order',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('state', sa.String(length=80), nullable=False),
    sa.Column('day_Date', sa.String(length=20), nullable=False),
    sa.Column('month_Date', sa.String(length=20), nullable=False),
    sa.Column('year_Date', sa.String(length=20), nullable=False),
    sa.Column('id_Restaurant', sa.Integer(), nullable=False),
    sa.Column('id_Sucursale', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['id_Restaurant'], ['restaurant.id'], ),
    sa.ForeignKeyConstraint(['id_Sucursale'], ['sucursale.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('state')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order')
    # ### end Alembic commands ###
