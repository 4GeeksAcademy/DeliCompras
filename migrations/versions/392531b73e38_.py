"""empty message

Revision ID: 392531b73e38
Revises: 16aa80f8f4d6
Create Date: 2023-11-12 20:51:20.944425

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '392531b73e38'
down_revision = '16aa80f8f4d6'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cart', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id_Restaurant', sa.Integer(), nullable=False))
        batch_op.drop_constraint('cart_id_User_fkey', type_='foreignkey')
        batch_op.create_foreign_key(None, 'restaurant', ['id_Restaurant'], ['id'])
        batch_op.drop_column('id_User')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('cart', schema=None) as batch_op:
        batch_op.add_column(sa.Column('id_User', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.create_foreign_key('cart_id_User_fkey', 'user', ['id_User'], ['id'])
        batch_op.drop_column('id_Restaurant')

    # ### end Alembic commands ###
